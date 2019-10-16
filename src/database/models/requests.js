module.exports = (sequelize, DataTypes) => {
  const requests = sequelize.define('requests', {
    typeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    locationId: DataTypes.INTEGER,
    statusId: DataTypes.INTEGER
  }, {});
  // eslint-disable-next-line func-names
  requests.associate = function (models) {
    // associations can be defined here
    requests.belongsTo(models.tripTypes, {
      as: 'type',
      foreignKey: 'typeId',
    });
    requests.belongsTo(models.requestStatus, {
      as: 'status',
      foreignKey: 'statusId',
    });
    requests.belongsTo(models.locations, {
      as: 'origin',
      foreignKey: 'locationId',
    });
    requests.hasMany(models.destinations, {
      targetKey: 'requestId',
      sourceKey: 'id'
    });
  };

  return requests;
};