import database from '../database/models';
import userServiceHelper from './serviceHelpers/userServiceHelpers';

const findOne = (query, scope = null) => database.users.scope(scope)
  .findOne(query).then(user => user);

const findOrCreate = (query, scope = null) => database.users.scope(scope)
  .findOrCreate(query).then(([user, created]) => {
    if (created) return userServiceHelper.deleteUserKeys(user);
    return user;
  });

module.exports = {
  findOrCreate, findOne
};
