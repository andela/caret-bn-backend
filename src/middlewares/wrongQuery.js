import responseError from '../utils/responseError';

const message = 'Wrong query on search bookings. Search queries Cannot be empty';

const wrongQuery = (req, res, next) => {
  if (Object.keys(req.query).length === 0) {
    return responseError(res, 400, message);
  }
  return next();
};

export default wrongQuery;
