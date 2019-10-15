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
    },
    role: Datatypes.STRING
  }, {
    scopes: {
      responseScope: {
        attributes: {
          exclude: ['googleId', 'facebookId', 'isVerified', 'password'],
        },
      }
    },
    tableName: 'users'
  });
  // eslint-disable-next-line func-names
  Users.associate = function (models) {
    Users.hasMany(models.requests, {
      targetKey: 'userId',
      sourceKey: 'id'
    });
  };
  return Users;
};
