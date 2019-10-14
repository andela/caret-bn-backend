
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.addColumn('users', 'googleId', {
      type: Sequelize.STRING,
      allowNull: true
    }, { transaction: t }),
<<<<<<< HEAD

    queryInterface.addColumn('users', 'isValid', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }, { transaction: t })

=======
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
  ])),

  down: queryInterface => queryInterface.sequelize.transaction(t => Promise.all([
    queryInterface.removeColumn('users', 'googleId', { transaction: t }),
<<<<<<< HEAD
    queryInterface.removeColumn('users', 'isValid', { transaction: t })
=======
>>>>>>> 40b062c5083669c4634ae34b9d1bdb69765b8240
  ])),
};
