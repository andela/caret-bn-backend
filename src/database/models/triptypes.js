module.exports = (sequelize, DataTypes) => {
  const tripTypes = sequelize.define('tripTypes', {
    name: DataTypes.STRING
  }, {});
  return tripTypes;
};
