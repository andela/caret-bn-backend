'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    comment: { type:DataTypes.STRING, allowNull: false} ,
    userId: { type:DataTypes.INTEGER},
    requestId: { type:DataTypes.INTEGER },
    deleted: {type:DataTypes.BOOLEAN, defaultValue:false} ,
  }, { freezeTableName: true });
  
  comments.associate = function(models) {
    comments.belongsTo(models.users, {
        as: 'user',
        foreignKey: 'userId',
        targetKey: 'id',
      });
    comments.belongsTo(models.requests, {
        as: 'request',
        foreignKey: 'requestId',
        targetKey: 'id',
      });

  };
  return comments;
};
