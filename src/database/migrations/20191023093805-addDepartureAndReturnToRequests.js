'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('requests', 'departureDate', {
      type: Sequelize.DATEONLY,
      allowNull: false
    }, { transaction: t }),

    queryInterface.addColumn('requests', 'returnDate', {
      type: Sequelize.DATEONLY,
      allowNull: true
    }, { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('requests', 'departureDate', { transaction: t }),
    queryInterface.removeColumn('requests', 'returnDate', { transaction: t }),
  ])),
};
