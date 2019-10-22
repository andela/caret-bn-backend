import models from '../database/models';
import Utilities from '../utils/index';

const managerUserIdField = async (req, res, next) => {
  // eslint-disable-next-line max-len
  if ((Object.keys(req.body).length === 0) || (Object.keys(req.body).length > 0 && !Object.keys(req.body).includes('userId'))) {
    const managerId = req.user.payload.id;
    const myUsers = [];

    await models.users.findAll({
      where: {
        lineManager: managerId,
      }
    }).then(users => users.forEach(user => myUsers.push(user.id)));
    req.body.userId = myUsers;
    return next();
  }

  const user = await models.users.findOne({
    where: {
      id: req.body.userId,
    }
  });

  if (user.lineManager !== req.user.payload.id) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.user.requests.NOT_MANAGER,
      {},
      403
    );
  }
  return next();
};

export default managerUserIdField;
