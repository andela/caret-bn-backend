module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('locations', {
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    images: DataTypes.JSONB,
  }, {
    tableName: 'locations'
  });
  return Locations;
};
