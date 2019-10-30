'use strict';
module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    requestId: DataTypes.INTEGER,
    userNotified: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'notifications'
  });
  notifications.associate = function(models) {
    // associations can be defined here
    notifications.belongsTo(models.requests, {
      as: 'request',
      foreignKey: 'requestId',
    });
    notifications.belongsTo(models.users, {
      as: 'notifiedUser',
      foreignKey: 'userNotified'
    });
  };
  return notifications;
};