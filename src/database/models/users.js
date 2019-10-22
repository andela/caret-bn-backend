module.exports = (sequelize, Datatypes) => {
  const Users = sequelize.define('users', {
    username: Datatypes.STRING,
    email: Datatypes.STRING,
    googleId: Datatypes.STRING,
    facebookId: Datatypes.STRING,
    password: Datatypes.STRING,
    role: Datatypes.INTEGER,
    phone: Datatypes.STRING,
    gender: Datatypes.STRING,
    dob: Datatypes.DATE,
    country: Datatypes.STRING,
    language: Datatypes.STRING,
    currency: Datatypes.STRING,
    company: Datatypes.STRING,
    department: Datatypes.STRING,
    isVerified: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
    },
    lineManager:{
      type: Datatypes.INTEGER,
      defaultValue: 8
    }
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
    Users.belongsTo(models.Role, {
      as: 'Role',
      foreignKey: 'role',
      targetKey: 'id',
    });
  };
  return Users;
};
