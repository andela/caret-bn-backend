import Joi from '@hapi/joi';

export default function validateSignup(data) {
  const schema = Joi.object({
    username: Joi.string().trim().regex(/^[a-zA-Z0-9]{3,10}$/).required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/).required().label('Password should contain at least 8 characters, lowercase and uppercse and special characters.'),
    confirmPassword: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/).required().label('Confirm Password should contain at least 8 characters, lowercase and uppercse and special characters.'),
  });
  return schema.validate(data);
}
