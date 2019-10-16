'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('requestStatuses', [{
      name: 'Pending',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Rejected',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Approved',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('requestStatuses', null, {})
  ])
};
