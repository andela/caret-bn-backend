import { Op } from 'sequelize';
import models from '../database/models';

const managerUserIdField = async (req, res, next) => {
  // eslint-disable-next-line max-len
  if ((Object.keys(req.body).length === 0) || (Object.keys(req.body).length > 0 && !Object.keys(req.body).includes('username'))) {
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

  const users = await models.users.findAll({
    where: { username: { [Op.iLike]: `%${req.body.username}%` }, lineManager: req.user.payload.id }
  });

  const userId = [];

  if (users.length) {
    users.forEach(user => {
      userId.push(user.id);
    });
  } else {
    userId.push(0);
  }

  req.body.userId = userId;

  return next();
};

export default managerUserIdField;
