'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookmarks = sequelize.define('bookmarks', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER
  }, {});
  bookmarks.associate = function(models) {
    // associations can be defined here
    bookmarks.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id'
    });
    bookmarks.belongsTo(models.accommodations, {
      as: 'accommodation',
      foreignKey: 'accommodationId',
      targetKey: 'id'
    });
  };
  return bookmarks;
};