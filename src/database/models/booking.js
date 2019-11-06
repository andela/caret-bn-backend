'use strict';
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    bookedSpace: DataTypes.INTEGER,
    statusId: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    checkIn: DataTypes.DATEONLY,
    checkOut: DataTypes.DATEONLY
  }, {});
  booking.associate = function(models) {
    booking.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'userId',
      targetKey: 'id',
    });
    booking.belongsTo(models.requestStatus, {
      as: 'status',
      foreignKey: 'statusId',
      targetKey: 'id',
    });
    booking.belongsTo(models.accommodations, {
      as: 'accommodation',
      foreignKey: 'accommodationId',
      targetKey: 'id',
    });
  };
  return booking;
};