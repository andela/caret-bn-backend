module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define('users', {
    username: Datatypes.STRING,
    email: Datatypes.STRING,
    googleId: Datatypes.STRING,
    facebookId: Datatypes.STRING,
    isValid: Datatypes.BOOLEAN
  }, {
    scopes: {
      responseScope: {
        attributes: {
          exclude: ['googleId', 'facebookId', 'isValid'],
        },
      }
    },
    tableName: 'users'
  });
  return Users;
};
