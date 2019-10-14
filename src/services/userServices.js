import database from '../database/models';


const findOrCreate = (query, scope = null) => database.users.scope(scope)
  .findOrCreate(query).then(response => {
    const user = response[0];
    return user;
<<<<<<< HEAD
  }).catch(err => err);
=======
  });
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
module.exports = {
  findOrCreate
};
