module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('users', 'password', {
      type: Sequelize.STRING,
      allowNull: true
    }, { transaction: t }),
    queryInterface.addColumn('users', 'isVerified', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }, { transaction: t }),
    queryInterface.addColumn('users', 'role', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 6
    }, { transaction: t }),
  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('users', 'password', { transaction: t }),
    queryInterface.removeColumn('users', 'isVerified', { transaction: t }),
    queryInterface.removeColumn('users', 'role', { transaction: t }),
  ])),
};
