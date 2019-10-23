'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('accommodations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {type: Sequelize.STRING},
      description: {type: Sequelize.STRING},
      locationId: {
        allowNull: false, type: Sequelize.INTEGER,
        references: {
          model: { tableName: 'locations', }, key: 'id',
        }
      },
      availableSpace: {type: Sequelize.INTEGER},
      cost: {type: Sequelize.INTEGER},
      currency: {type: Sequelize.STRING},
      highlights: {type: Sequelize.STRING},
      amenities: { type: Sequelize.STRING},
      owner: {type: Sequelize.INTEGER},
      images: {type: Sequelize.JSONB},
      slug: {type: Sequelize.STRING},
      createdAt: {allowNull: false,type: Sequelize.DATEONLY},
      updatedAt: {allowNull: false,type: Sequelize.DATEONLY}
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('accommodations');
  }
};
