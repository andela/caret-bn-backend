import cloudinary from 'cloudinary';
import models from '../database/models';
import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import imagesHelper from '../helpers/imagesHelper';

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

const { uploadImages, uploadSingle } = imagesHelper;

export default class AccommodationController {
  static async createAccommodation(req, res) {
    let images = [];
    const {
      name, description, location, availableSpace, cost, highlights, amenities
    } = req.body;

    if (req.files.image.length > 1) { images = await uploadImages(req.files.image); } else {
      images = await uploadSingle(req, res);
      images = images.url;
    }

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
}
