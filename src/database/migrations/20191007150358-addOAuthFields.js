
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('users', 'googleId', {
      type: Sequelize.STRING,
      allowNull: true
    }, { transaction: t }),

    queryInterface.addColumn('users', 'isValid', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }, { transaction: t })

  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('users', 'googleId', { transaction: t }),
    queryInterface.removeColumn('users', 'isValid', { transaction: t })
  ])),
};
