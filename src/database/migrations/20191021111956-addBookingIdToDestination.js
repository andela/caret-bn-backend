
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('destinations', 'bookingId', {
      type: Sequelize.INTEGER,
      allowNull: true
    },  { transaction: t }), 
    queryInterface.removeColumn('destinations', 'accomodationId', { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('destinations', 'bookingId', { transaction: t }),
    queryInterface.addColumn('destinations', 'accomodationId', {
      type: Sequelize.INTEGER,
      allowNull: true
    },  { transaction: t }), 
  ])),
};
