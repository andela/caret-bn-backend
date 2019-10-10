
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('users', 'email', {
    type: Sequelize.STRING,
    allowNull: true
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('users', 'email', {
    type: Sequelize.STRING,
    allowNull: false
  })
};
