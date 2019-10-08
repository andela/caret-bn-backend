import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';

export default function confirmPassword({ body: { password, confirmPassword } }, res, next) {
  if (password !== confirmPassword) {
    return responseUtil(
      res,
      400,
      strings.users.error.BAD_SIGNUP_REQUEST,
      strings.users.error.PASSWORD_NOT_MATCH
    );
  }
  return next();
}
