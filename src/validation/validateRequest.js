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
    departureDate: Joi.date().greater('now').required().messages({
      'date.base': 'Original departure date must be a valid date',
      'any.required': 'Original departure date is required to process your request',
      'date.greater': 'Please set a departure date that comes after today'
    }),
    returnDate: Joi.date()
      .when('typeId', {
        is: 2,
        then: Joi.required()
      }).greater(Joi.ref('departureDate')).messages({
        'any.required': 'Please specify a return date',
        'date.base': 'Your return date must be a valid date',
        'date.greater': 'Please set a return date that is greater that the specified original departure date'
      }),
    destinations: Joi.array()
      .items(Joi.object({
        arrivalDate: Joi.date().greater(Joi.ref('....departureDate')).required().messages({
          'date.base': 'Your listed arrival dates from your destinations must be valid dates, please verify them',
          'any.required': 'Please ensure the arrival dates in your listed destinations are all present',
          'date.greater': 'Your arrival dates must be valid dates that come after the preceeding departure dates'
        }),
        departureDate: Joi.date().greater(Joi.ref('arrivalDate'))
          .when('....typeId', {
            not: 1,
            then: Joi.required()
          }).messages({
            'date.base': 'Your listed departure dates from your destinations must be valid dates, please verify them',
            'any.required': 'Please ensure the departure dates in your destinations are all present',
            'date.greater': 'Your departure dates must be valid dates that come after the preceeding arrival dates'
          }),
        reasons: Joi.string().trim(true).messages({
          'string.empty': 'Please ensure you have listed travel reasons in all your destinations',
        }),
        isFinal: Joi.boolean().required().messages({
          'any.required': 'Please ensure you have marked a destination as final',
        }),
        bookingId: Joi.number().positive().required().messages({
          'any.required': 'Please ensure you have specified your bookings against all destinations',
        }),
        locationId: Joi.number().positive().required().messages({
          'any.required': 'Please ensure that you have specified all your destinations as required',
        }),
      }))
      .min(minimumItems)
      .max(maximumItems)
      .required(),
    host: Joi.string().uri().trim().message('host must be a valid URL'),

  });
  return schema.validate(data, { abortEarly: false });
};

export default validateRequest;
