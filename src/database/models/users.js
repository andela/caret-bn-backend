module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define('users', {
    username: Datatypes.STRING,
    email: Datatypes.STRING,
    googleId: Datatypes.STRING,
    facebookId: Datatypes.STRING,
    password: Datatypes.STRING,
    isVerified: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    }
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
