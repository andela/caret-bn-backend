module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('notifications', 'entity', {
      type: Sequelize.STRING,
      allowNull: true
    }, { transaction: t }),
    queryInterface.addColumn('notifications', 'entityId', {
      type: Sequelize.INTEGER,
      allowNull: true
    }, { transaction: t }),
    queryInterface.removeColumn('notifications', 'requestId', { transaction: t }),

  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('notifications', 'requestId', {
      type: Sequelize.INTEGER,
      allowNull: true
    }, { transaction: t }),
    queryInterface.removeColumn('notifications', 'entity', { transaction: t }),
    queryInterface.removeColumn('notifications', 'entityId', { transaction: t }),
  ])),
};