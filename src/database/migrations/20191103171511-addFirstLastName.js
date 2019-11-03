module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('users', 'firstName', {
      type: Sequelize.STRING,
      allowNull: true
    }, { transaction: t }),
    queryInterface.addColumn('users', 'lastName', {
      type: Sequelize.STRING,
      allowNull: true
    }, { transaction: t }),
  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('users', 'firstName', { transaction: t }),
    queryInterface.removeColumn('users', 'lastName', { transaction: t }),
  ])),
};
