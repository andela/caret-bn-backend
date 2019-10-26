import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const checkSupplierRole = (req, res, next) => {
  const { role } = req.user.payload;
  if (role !== 5) {
    return responseError(res, 403, strings.users.error.NO_ACCESS);
  }
  return next();
};

const checkManagerRole = (req, res, next) => {
  const { role } = req.user.payload;
  if (role !== 4) {
    return responseError(res, 403, strings.requests.MANAGERS_ONLY);
  }
  return next();
};

export default { checkSupplierRole, checkManagerRole };
