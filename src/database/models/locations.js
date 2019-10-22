module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define('locations', {
    name: DataTypes.STRING,
    country: DataTypes.STRING
  }, {
    tableName: 'locations'
  });
  return Locations;
};
