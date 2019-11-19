'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users','logoutTime',{
      type: Sequelize.DATE,
      allowNull: true
    },'')
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users','logoutTime');
  }
};
