module.exports = (sequelize, DataTypes) => {
  const accommodations = sequelize.define('accommodations', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    location: DataTypes.STRING,
    availableSpace: DataTypes.STRING,
    cost: DataTypes.INTEGER,
    highlights: DataTypes.STRING,
    amenities: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    images: DataTypes.JSONB
  }, { tableName: 'accommodations' });
  accommodations.associate = function (models) {
    // associations can be defined here
    accommodations.belongsTo(models.users, {
      foreignKey: 'owner',
      targetKey: 'id',
    });
  };
  return accommodations;
};
