import models from '../database/models';


const findOneRequest = properties => {
  const request = models.requests.findOne({
    where: properties,
    raw: true
  });
  return request;
};

export default { findOneRequest };
