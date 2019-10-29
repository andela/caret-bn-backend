
module.exports = (sequelize, DataTypes) => {
  const destinations = sequelize.define('destinations', {
    locationId: DataTypes.INTEGER,
    bookingId: DataTypes.INTEGER,
    arrivalDate: DataTypes.DATE,
    departureDate: DataTypes.DATE,
    requestId: DataTypes.INTEGER,
    reasons: DataTypes.STRING,
    isFinal: DataTypes.BOOLEAN
  }, {});
  // eslint-disable-next-line func-names
  destinations.associate = function (models) {
    // associations can be defined here
    destinations.belongsTo(models.locations, {
      as: 'location',
      foreignKey: 'locationId',
    });
  };
  return destinations;
};
