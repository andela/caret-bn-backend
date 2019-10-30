import models from '../database/models';

const findOneRequest = async dataObj => {
  const request = await models.requests.findOne({
    where: dataObj
  });
  return request;
};

export default findOneRequest;
