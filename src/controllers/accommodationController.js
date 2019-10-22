import cloudinary from 'cloudinary';
import models from '../database/models';
import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import imageUploader from '../helpers/imageUploader';

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

const {
  CREATED, NO_INFO_YET, RETRIEVED, NO_ACCOMMODATION
} = strings.accommodation.success;

export default class AccommodationController {
  static async createAccommodation(req, res) {
    const {
      name, description, locationId, availableSpace, cost, currency, highlights, amenities
    } = req.body;

    const images = await imageUploader(req, res);

    const accommodation = {
      name: name.toLowerCase(),
      description,
      locationId,
      availableSpace,
      cost,
      currency: currency.toUpperCase(),
      highlights,
      amenities,
      owner: req.user.payload.id,
      images
    };
    try {
      const newAccommodation = await models.accommodations.create(accommodation);

      return responseUtil(res, 201, CREATED, newAccommodation);
    } catch (error) { return responseError(res, 400, error); }
  }

  static async getAllAccommodations(req, res) {
    const { role, id: owner } = req.user.payload;
    if (role === 5) {
      const MyAccommodations = await models.accommodations.findAll({
        where: { owner },
        attributes: { exclude: ['locationId'] },
        include: [{
          model: models.locations, as: 'accommodationLocation', attributes: ['id', 'name']
        }]
      });

      return responseUtil(res, 200, (MyAccommodations.length === 0)
        ? NO_INFO_YET
        : RETRIEVED, MyAccommodations);
    }
    if (role === 1) {
      const allAccommodations = await models.accommodations.findAll({
        attributes: { exclude: ['locationId'] },
        include: [{
          model: models.locations, as: 'accommodationLocation', attributes: ['id', 'name']
        }]
      });

      return responseUtil(res, 200, (allAccommodations.length === 0)
        ? NO_ACCOMMODATION
        : RETRIEVED, allAccommodations);
    }
    return responseError(res, 403, strings.users.error.NO_ACCESS);
  }

  static async editAccommodation(req, res) {
    const { body, files } = req;

    if (Object.keys(body).length === 0) {
      return responseError(res, 400, 'There is nothing to update! Provide some information!');
    }

    let images;

    if (Object.keys(files).length > 0) {
      images = await imageUploader(req, res);
    }

    const editAccommodation = (images) ? { ...body, images } : { ...body };
    const { accommodation } = req;

    models.accommodations.update(editAccommodation, {
      where: {
        id: accommodation.id,
      },
      returning: true,
      plain: true
    }).then(updatedAccommodation => {
      updatedAccommodation[1].dataValues.owner = accommodation.ownerUser;
      responseUtil(
        res,
        200,
        strings.accommodations.success.ACCOMMODATION_UPDATED,
        updatedAccommodation[1].dataValues,
      );
    });
  }

  static deleteAccommodation(req, res) {
    const { accommodation } = req;
    models.accommodations.destroy({ where: { id: accommodation.id } }).then(() => {
      responseUtil(res, 200, strings.accommodations.success.ACCOMMODATION_DELETED);
    });
  }
}
