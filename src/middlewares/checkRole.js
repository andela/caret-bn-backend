import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const checkSupplierRole = (req, res, next) => {
  const { role } = req.user.payload;
  if (role !== 5) {
    return responseError(res, 403, strings.users.error.NO_ACCESS);
  }
  return next();
};

export default { checkSupplierRole };
