module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('chats', 'createdAt', { transaction: t }),
    queryInterface.removeColumn('chats', 'updatedAt', { transaction: t }),
    queryInterface.addColumn('chats', 'createdAt', {
      type: Sequelize.DATE,
    }, { transaction: t }),
    queryInterface.addColumn('chats', 'updatedAt', {
      type: Sequelize.DATE,
    }, { transaction: t }),
  ])),

  down: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('chats', 'createdAt', { transaction: t }),
    queryInterface.removeColumn('chats', 'updatedAt', { transaction: t }),
    queryInterface.addColumn('chats', 'createdAt', {
      type: Sequelize.DATEONLY,
    }, { transaction: t }),
    queryInterface.addColumn('chats', 'updatedAt', {
      type: Sequelize.DATEONLY,
    }, { transaction: t }),
  ])),
};