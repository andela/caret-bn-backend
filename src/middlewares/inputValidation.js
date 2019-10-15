import Joi from '@hapi/joi';
import models from '../database/models';
import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const validation = (req, res, schema, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errorMessages = [];
    error.details.forEach(detail => {
      errorMessages.push(detail.message.split('"').join(''));
    });
    return responseError(res, 400, strings.users.error.INVALID_INPUT, errorMessages);
  }
  return next();
};

export default class InputValidation {
  static validateAddNew(req, res, next) {
    const schema = Joi.object({
      name: Joi.string().trim().min(10).max(100)
        .message('Name should be at least 10 character and not more than 100 characters!')
        .required(),
      description: Joi.string().min(10).max(250).required(),
      location: Joi.string().max(50).required(),
      availableSpace: Joi.number().integer().min(1).max(99990)
        .required(),
      cost: Joi.number().integer().min(1).max(99999)
        .required(),
      highlights: Joi.string().min(10).max(250).required(),
      amenities: Joi.string().min(10).max(250).required()
    });
    validation(req, res, schema, next);
  }

  static validateImage(req, res, next) {
    if (!req.files.image) {
      return responseError(res, 400, strings.images.NO_IMAGE);
    }
    return next();
  }

  static validateLogin(req, res, next) {
    const schema = Joi.object({
      email: Joi.required(),
      password: Joi.required()
    });
    validation(req, res, schema, next);
  }

  static async validateExistence(req, res, next) {
    let { name, location } = req.body;
    name = name.toLowerCase();
    location = location.toLowerCase();
    const foundAccommodation = await models.accommodations.findOne({ where: { name, location } });
    if (foundAccommodation) {
      return responseError(res, 409, strings.accommodation.error.EXISTING);
    }
    return next();
  }
}
