import responseError from '../utils/responseError';
import string from '../utils/stringsUtil';

const user = {
  compareData(req, res, next) {
    if (req.user.payload.email !== req.params.email) {
      return responseError(res, 400, string.users.error.USER_SAME_EMAIL);
    }
    next();
  }
};

export default user;
