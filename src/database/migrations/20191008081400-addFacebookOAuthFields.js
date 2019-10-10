
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('users', 'facebookId', {
      type: Sequelize.STRING,
      allowNull: true
    }, { transaction: t })
  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('users', 'facebookId', { transaction: t }),
  ])),
};
