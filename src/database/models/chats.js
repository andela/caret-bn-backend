'use strict';
module.exports = (sequelize, DataTypes) => {
  const chats = sequelize.define('chats', {
    userId: DataTypes.INTEGER,
    receiverId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  chats.associate = function(models) {
    // associations can be defined here
    chats.belongsTo(models.users, {
      as:'user',
      sourceKey: 'userId',
      targetKey: 'id'
    });
    chats.belongsTo(models.users, {
      as:'receiver',
      sourceKey: 'receiverId',
      targetKey: 'id'
    });
  };
  return chats;
};