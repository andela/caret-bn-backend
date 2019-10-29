'use strict';
module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define('booking', {
    userId: DataTypes.INTEGER,
    accommodationId: DataTypes.INTEGER,
    bookedSpace: DataTypes.INTEGER,
    checkIn: DataTypes.DATE,
    checkOut: DataTypes.DATE
  }, {});
  booking.associate = function(models) {
    booking.belongsTo(models.users, {
      as: 'user',
      foreignKey: 'userId',
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