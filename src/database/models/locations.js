module.exports = (sequelize, DataTypes) => {
  const locations = sequelize.define('locations', {
    name: DataTypes.STRING,
    country: DataTypes.STRING
  }, {});
  return locations;
};
