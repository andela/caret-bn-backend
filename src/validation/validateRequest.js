import Joi from '@hapi/joi';


const validateRequest = data => {
  let minimumItems = 1;
  let maximumItems = 30;

  if (data.typeId === 1 || data.typeId === 2) {
    maximumItems = 1;
  }

  if (data.typeId === 3) {
    minimumItems = 2;
  }
  const schema = Joi.object({
    locationId: Joi.number().positive().required(),
    typeId: Joi.number().positive()
      .required(),
    departureDate: Joi.date().greater('now').required(),
    returnDate: Joi.date()
      .when('typeId', {
        is: 2,
        then: Joi.required()
      }).greater(Joi.ref('departureDate')),
    destinations: Joi.array()
      .items(Joi.object({
        arrivalDate: Joi.date().greater(Joi.ref('....departureDate')).required(),
        departureDate: Joi.date().greater(Joi.ref('arrivalDate'))
          .when('....typeId', {
            not: 1,
            then: Joi.required()
          }),
        reasons: Joi.string().trim(true),
        isFinal: Joi.boolean().required(),
        bookingId: Joi.number().positive().required(),
        locationId: Joi.number().positive().required(),
      }))
      .min(minimumItems)
      .max(maximumItems)
      .required(),
  });
  return schema.validate(data, { abortEarly: false });
};

export default validateRequest;
