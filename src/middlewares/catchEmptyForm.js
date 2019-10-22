import strings from '../utils/stringsUtil';
import responseError from '../utils/responseError';

const catchEmptyForm = (req, res, next) => {
  const { headers } = req;
  if (headers['content-type'].includes('multipart/form-data') && headers['content-length'] === '0') {
    return responseError(res, 400, strings.accommodations.error.EMPTY_FORM);
  }
  return next();
};

export default catchEmptyForm;
