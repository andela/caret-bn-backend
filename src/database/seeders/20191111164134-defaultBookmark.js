'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('bookmarks', [
      {
        userId: 3,
        accommodationId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
  ])
  ]),
  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('bookmarks', null, {})
  ])
};
