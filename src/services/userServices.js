import database from '../database/models';


const findOrCreate = (query, scope = null) => database.users.scope(scope)
  .findOrCreate(query).then(response => {
    const user = response[0];
    return user;
  }).catch(err => err);
module.exports = {
  findOrCreate
};
