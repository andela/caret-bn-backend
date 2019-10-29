import responseError from './responseError';
import strings from './stringsUtil';


export default (res, error) => {
  const errorMessages = [];
  error.details.forEach(detail => {
    errorMessages.push(detail.message.split('"').join(''));
  });
  return responseError(res, 400, strings.users.error.INVALID_INPUT, errorMessages);
};
