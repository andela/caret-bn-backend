
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: false
    }, { transaction: t }),
    queryInterface.addColumn('users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }, { transaction: t })
  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('users', 'password', { transaction: t }),
    queryInterface.removeColumn('users', 'isVerified', { transaction: t }),
  ])),
};
