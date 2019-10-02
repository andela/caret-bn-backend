'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      username : 'John',
      email : 'johnDoe@test.com',
      createdAt : new Date(),
      updatedAt : new Date()
      
    }], {});
  },

  down : function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', [{
      first_name :'John'
    }])
  }
};
