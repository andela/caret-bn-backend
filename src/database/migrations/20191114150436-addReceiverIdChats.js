module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('chats', 'receiverId', {
      type: Sequelize.INTEGER,
      allowNull: true
    }, { transaction: t }),
  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('chats', 'receiverId', { transaction: t }),
  ])),
};