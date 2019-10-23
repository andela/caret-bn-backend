import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const checkSupplierRole = (req, res, next) => {
  const { role } = req.user.payload;
  if (role !== 5) {
    return responseError(res, 403, strings.users.error.NO_ACCESS);
  }
  return next();
};
const checkBookingRole = (req, res, next) => {
  const { role } = req.user.payload;
  if (role === 5) {
    return responseError(res, 403, strings.users.error.NOT_ALLOWED);
  }
  return next();
};

const supplierNotAllowed = (req, res, next) => {
  const { role } = req.user.payload;
  if (role === 5) {
    return responseError(res, 403, strings.users.error.SUPPLIER_NOT_ALLOWED);
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

export default {
  checkSupplierRole, checkManagerRole, checkBookingRole, supplierNotAllowed
};
