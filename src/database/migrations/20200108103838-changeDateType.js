module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('notifications', 'createdAt', { transaction: t }),
    queryInterface.removeColumn('notifications', 'updatedAt', { transaction: t }),
    queryInterface.addColumn('notifications', 'createdAt', {
      type: Sequelize.DATE,
    }, { transaction: t }),
    queryInterface.addColumn('notifications', 'updatedAt', {
      type: Sequelize.DATE,
    }, { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('notifications', 'createdAt', { transaction: t }),
    queryInterface.removeColumn('notifications', 'updatedAt', { transaction: t }),
    queryInterface.addColumn('notifications', 'createdAt', {
      type: Sequelize.DATEONLY,
    }, { transaction: t }),
    queryInterface.addColumn('notifications', 'updatedAt', {
      type: Sequelize.DATEONLY,
    }, { transaction: t }),
  ])),
};