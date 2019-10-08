import models from '../database/models';
import responseUtil from './responseUtil';

export default function verifyUserExist(res, property, message) {
  models.users.count({
    where: property
  }).then(count => {
    if (count > 0) {
      return responseUtil(res, 409, message);
    }
  });
}
