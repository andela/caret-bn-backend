import validateSignup from '../validation/validateSignup';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';

export default function checkSignup({ body }, res, next) {
  const { error } = validateSignup(body);
  if (error) {
    return responseUtil(
      res,
      400,
      strings.users.error.BAD_SIGNUP_REQUEST,
      { error: error.details[0].message }
    );
  }
  return next();
}
