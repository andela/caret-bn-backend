import responseError from '../utils/responseError';
import findOneRequest from './findOneRequest';

const alreadyProcessed = async (res, id, statusId, message, next) => {
  const request = await findOneRequest({ id, statusId });

  if (request) {
    return responseError(res, 400, message, {});
  }

  return next();
};

export default alreadyProcessed;
