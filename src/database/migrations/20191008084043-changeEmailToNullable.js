
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.changeColumn('users', 'email', {
    type: Sequelize.STRING,
    allowNull: true
  }),

  down: (queryInterface, Sequelize) => queryInterface.changeColumn('users', 'email', {
    type: Sequelize.STRING,
<<<<<<< HEAD
    allowNull: false
=======
    allowNull: true,
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
  })
};
