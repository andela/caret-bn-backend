'use strict';
module.exports = (sequelize, DataTypes) => {
  const comments = sequelize.define('comments', {
    comment: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER,
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {});
  comments.associate = function(models) {
    // associations can be defined here
    comments.belongsTo(models.users, {
      as: 'commenter',
      foreignKey: 'userId',
    });
    comments.belongsTo(models.requests, {
      as: 'requestComment',
      foreignKey: 'requestId',
    });
  };
  return comments;
};
