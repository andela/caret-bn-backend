'use strict';
module.exports = (sequelize, DataTypes) => {
  const chats = sequelize.define('chats', {
    userId: DataTypes.INTEGER,
    message: DataTypes.STRING
  }, {});
  chats.associate = function(models) {
    // associations can be defined here
    chats.belongsTo(models.users, {
      as:'user',
      sourceKey: 'userId',
      targetKey: 'id'
    });
  };
  return chats;
};