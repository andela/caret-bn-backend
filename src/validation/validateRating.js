import Joi from '@hapi/joi';

const validateRating = data => {
  const schema = Joi.object({
    accommodationId: Joi.number().positive().required(),
    rating: Joi.number().integer().positive().max(5)
      .required(),
    feedback: Joi.string().min(3).max(100).when('rating', {
      is: 1,
      then: Joi.required()
    })
      .when('rating', {
        is: 2,
        then: Joi.required()
      })
      .when('rating', {
        is: 3,
        then: Joi.required()
      })
  });
  return schema.validate(data, { abortEarly: false });
};

export default validateRating;
