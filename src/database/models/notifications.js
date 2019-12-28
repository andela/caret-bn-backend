
'use strict';
module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define('notifications', {
    entityId: DataTypes.INTEGER,
    entity: DataTypes.STRING,
    userNotified: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    timestamp: {
      type: DataTypes.TIME,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'notifications'
  });
  notifications.associate = function(models) {
    // associations can be defined here
    // notifications.belongsTo(models.requests, {
    //   as: 'request',
    //   foreignKey: 'requestId',
    // });
    notifications.belongsTo(models.users, {
      as: 'notifiedUser',
      foreignKey: 'userNotified'
    });
  };
  return notifications;
};