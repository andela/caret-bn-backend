module.exports = (sequelize, DataTypes) => {
  const requestStatus = sequelize.define('requestStatus', {
    name: DataTypes.STRING
  });
  return requestStatus;
};
