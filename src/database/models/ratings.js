'use strict';
module.exports = (sequelize, DataTypes) => {
  const ratings = sequelize.define('ratings', {
    accommodationId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    feedback: DataTypes.TEXT
  }, {});
  ratings.associate = function (models) {
    // associations can be defined here
    ratings.belongsTo(models.users, {
      as: 'users',
      foreignKey: 'userId',
    });
  };
  return ratings;
};