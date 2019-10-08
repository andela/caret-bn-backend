import Joi from '@hapi/joi';

const validateSignup = data => {
  const schema = Joi.object({
    username: Joi.string().trim().regex(/^[a-zA-Z0-9]{3,20}$/).message('username field should be at least 3 alphanumeric characters long.')
      .required(),
    email: Joi.string().email({ minDomainSegments: 2 }).message('email field should be a valid email address. e.g: johndoe@gmail.com.').required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).message('password field should contain at least 8 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.').required(),
    confirmPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/).message('confirmPassword field should contain at least 8 characters, at least 1 lowercase, 1 uppercase and 1 number and a special character.').required(),
  });
  return schema.validate(data, { abortEarly: false });
};

export default validateSignup;
