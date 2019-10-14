import validateResetpassword from '../validation/validateResetpassword';
import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const checkReset = ({ body }, res, next) => {
  const { error } = validateResetpassword.validateResetpassword(body);
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

const checkEmail = ({ body }, res, next) => {
  const { error } = validateResetpassword.validateEmail(body);
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

export default { checkReset, checkEmail };
