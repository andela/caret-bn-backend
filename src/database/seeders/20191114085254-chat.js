'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('chats', [
      {
        userId: 4,
        receiverId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ])
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('chats', null, {})
  ])
};
