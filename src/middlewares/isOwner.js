import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const isOwner = (req, res, next) => {
  const { user, accommodation } = req;
  if (user.payload.id !== accommodation.ownerUser.id) {
    return responseError(res, 403, strings.accommodations.error.NOT_OWNER);
  }
  return next();
};

export default isOwner;
