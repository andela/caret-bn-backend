module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define('users', {
    username: Datatypes.STRING,
    email: Datatypes.STRING
  }, {
    tableName: 'users'
  });
  return Users;
};
