module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('notifications', 'timestamp', {
      type: Sequelize.TIME,
    }, { transaction: t }),
    queryInterface.addColumn('bookingNotifications', 'timestamp', {
      type: Sequelize.TIME,
    }, { transaction: t }),
  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('notifications', 'timestamp', { transaction: t }),
    queryInterface.removeColumn('bookingNotifications', 'timestamp', { transaction: t }),
  ])),
};