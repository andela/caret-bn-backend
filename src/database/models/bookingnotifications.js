'use strict';
module.exports = (sequelize, DataTypes) => {
  const bookingNotifications = sequelize.define('bookingNotifications', {
    bookingId: DataTypes.INTEGER,
    userNotified: DataTypes.INTEGER,
    activity: DataTypes.STRING,
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'bookingNotifications'
  });
  bookingNotifications.associate = function(models) {
    // associations can be defined here
    bookingNotifications.belongsTo(models.booking, {
      as: 'booking',
      foreignKey: 'bookingId',
    });
    bookingNotifications.belongsTo(models.users, {
      as: 'notifiedUser',
      foreignKey: 'userNotified'
    });
  };
  return bookingNotifications;
};