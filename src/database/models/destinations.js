module.exports = (sequelize, DataTypes) => {
  const destinations = sequelize.define('destinations', {
    locationId: DataTypes.INTEGER,
    accomodationId: DataTypes.INTEGER,
    arrivalDate: DataTypes.DATEONLY,
    departureDate: DataTypes.DATEONLY,
    requestId: DataTypes.INTEGER,
    reasons: DataTypes.STRING,
    isFinal: DataTypes.BOOLEAN
  }, {});
  destinations.associate = function (models) {
    // associations can be defined here
    destinations.belongsTo(models.locations, {
      as: 'location',
      foreignKey: 'locationId',
    });
  };
  return destinations;
};
