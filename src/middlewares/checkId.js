import idValidator from '../validation/idValidator';
import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const checkId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const { error } = idValidator({ id });
  if (error) {
    return responseError(res, 400, strings.id.error.ID_INVALID, error.details[0].message);
  }
  return next();
};

export default checkId;
