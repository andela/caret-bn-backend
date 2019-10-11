import Joi from '@hapi/joi';

const validateLogin = data => {
  const schema = Joi.object({
    email: Joi.required(),
    password: Joi.required()
  });
  return schema.validate(data, { abortEarly: false });
};

export default validateLogin;
