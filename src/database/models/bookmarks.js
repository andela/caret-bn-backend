'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookmarks = sequelize.define('bookmarks', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER
  }, {});
  bookmarks.associate = function(models) {
    // associations can be defined here
    bookmarks.belongsTo(models.accommodations, {
      as: 'accommodation',
      sourceKey: 'accommodationId',
      targetKey: 'id',
    });
  };
  return bookmarks;
};