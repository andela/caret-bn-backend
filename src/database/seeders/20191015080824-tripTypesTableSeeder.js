'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('tripTypes', [{
      name: 'One Way',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Return',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Multi City',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('tripTypes', null, {})
  ])
};
