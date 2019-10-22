'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('destinations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      locationId: {
        type: Sequelize.INTEGER
      },
      accomodationId: {
        type: Sequelize.INTEGER
      },
      arrivalDate: {
        type: Sequelize.DATEONLY
      },
      departureDate: {
        type: Sequelize.DATEONLY
      },
      requestId: {
        type: Sequelize.INTEGER
      },
      reasons: {
        type: Sequelize.STRING
      },
      isFinal: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('destinations');
  }
};