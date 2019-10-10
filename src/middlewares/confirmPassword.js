import strings from '../utils/stringsUtil';
import responseError from '../utils/responseError';

const confirmPassword = ({ body: { password, confirmPassword } }, res, next) => {
  if (password !== confirmPassword) {
    return responseError(
      res,
      400,
      strings.users.error.BAD_SIGNUP_REQUEST,
      strings.users.error.PASSWORD_NOT_MATCH
    );
  }
  return next();
};

export default confirmPassword;
