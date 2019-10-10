import validateSignup from '../validation/validateSignup';
import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const checkSignup = ({ body }, res, next) => {
  const { error } = validateSignup(body);
  if (error) {
    const errorMessages = [];
    error.details.forEach(detail => {
      errorMessages.push(detail.message);
    });
    return responseError(
      res,
      400,
      strings.users.error.BAD_SIGNUP_REQUEST,
      errorMessages
    );
  }
  return next();
};

export default checkSignup;
