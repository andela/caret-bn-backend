import database from '../database/models';
import userServiceHelper from './serviceHelpers/userServiceHelpers';

const findOrCreate = (query, scope = null) => database.users.scope(scope)
  .findOrCreate(query).then(([user, created]) => {
    if (created) return userServiceHelper.deleteUserKeys(user);
    return user;
  });

module.exports = {
  findOrCreate
};
