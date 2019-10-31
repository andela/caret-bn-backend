module.exports = (sequelize, DataTypes) => {
  const accommodations = sequelize.define('accommodations', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    locationId: DataTypes.INTEGER,
    availableSpace: DataTypes.INTEGER,
    cost: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    highlights: DataTypes.STRING,
    amenities: DataTypes.STRING,
    owner: DataTypes.INTEGER,
    images: DataTypes.JSONB,
    slug: DataTypes.STRING,
    isActivated: DataTypes.BOOLEAN,
  }, { tableName: 'accommodations' });
  accommodations.associate = models => {
    // associations can be defined here
    accommodations.belongsTo(models.users, {
      as: 'ownerUser',
      foreignKey: 'owner',
      targetKey: 'id',
    });
    accommodations.belongsTo(models.locations, {
      as: 'accommodationLocation',
      foreignKey: 'locationId',
      targetKey: 'id',
    });
    accommodations.hasMany(models.ratings, {
      targetKey: 'accommodationId',
      sourceKey: 'id',
      as: 'ratings'
    });
  };
  return accommodations;
};
