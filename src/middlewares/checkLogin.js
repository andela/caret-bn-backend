import validateLogin from '../validation/validateLogin';
import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const checkLogin = ({ body }, res, next) => {
  const { error } = validateLogin(body);
  if (error) {
    const errorMessages = [];
    error.details.forEach(detail => {
      errorMessages.push(detail.message);
    });
    return responseError(res, 400, strings.users.error.BAD_LOGIN_REQUEST, errorMessages);
  }
  return next();
};

export default checkLogin;
