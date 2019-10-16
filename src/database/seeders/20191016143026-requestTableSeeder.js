'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('requests', [
    {
      typeId: 3,
      userId: 3,
      locationId: 2,
      statusId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('requests', null, {})
  ])
};
