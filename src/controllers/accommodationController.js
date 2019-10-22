import cloudinary from 'cloudinary';
import models from '../database/models';
import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import imageUploader from '../helpers/imageUploader';

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

export default class AccommodationController {
  static async createAccommodation(req, res) {
    const {
      name, description, location, availableSpace, cost, highlights, amenities
    } = req.body;

    const images = await imageUploader(req, res);

    const accommodation = {
      name: name.toLowerCase(),
      description,
      location: location.toLowerCase(),
      availableSpace,
      cost,
      highlights,
      amenities,
      owner: req.user.payload.id,
      images
    };

    try {
      const newAccommodation = await models.accommodations.create(accommodation);

      return responseUtil(res, 201, strings.accommodation.success.CREATED, newAccommodation);
    } catch (error) { return responseError(res, 400, error); }
  }

  static async getMyAccommodations(req, res) {
    const owner = req.user.payload.id;

    const MyAccommodations = await models.accommodations.findAll({ where: { owner } });

    if (MyAccommodations.length === 0) {
      return responseUtil(res, 200, strings.accommodation.success.NO_INFO_YET);
    }
    return responseUtil(res, 200, strings.accommodation.success.RETRIEVED, MyAccommodations);
  }

  static async getAllAccommodations(req, res) {
    const allAccommodations = await models.accommodations.findAll();

    if (allAccommodations.length === 0) {
      return responseUtil(res, 200, strings.accommodation.success.NO_ACCOMMODATION);
    }
    return responseUtil(res, 200, strings.accommodation.success.RETRIEVED, allAccommodations);
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
