module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('bookings', 'statusId', {
      type: Sequelize.INTEGER,
      allowNull: false
    }, { transaction: t }),
  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('bookings', 'statusId', { transaction: t }),
  ])),
};