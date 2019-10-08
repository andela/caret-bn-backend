module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define('users', {
    username: Datatypes.STRING,
    email: Datatypes.STRING,
    password: Datatypes.STRING,
    isVerified: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    tableName: 'users'
  });
  return Users;
};
