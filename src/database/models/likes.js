'use strict';
module.exports = (sequelize, DataTypes) => {
  const likes = sequelize.define('likes', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, { freezeTableName: true });
  likes.associate = function(models) {
    likes.belongsTo(models.users, {
      as: 'liker',
      foreignKey: 'userId',
      targetKey: 'id',
    });
  };
  return likes;
};
