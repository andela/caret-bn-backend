import Joi from '@hapi/joi';

const idValidator = data => {
  const schema = Joi.object().keys({
    id: Joi.number().integer().required(),
  });
  return schema.validate(data);
};

export default idValidator;
