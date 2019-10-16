import Joi from '@hapi/joi';

const validateResetpassword = data => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.').required(),
    newpassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).message('password field should contain at least 8 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.').required(),
    confirmpassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).message('confirmpassword field should contain at least 8 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.').required(),
  });
  return schema.validate(data, { abortEarly: false });
};

const validateEmail = data => {
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.').required(),
  });
  return schema.validate(data, { abortEarly: false });
};
export default { validateResetpassword, validateEmail };
