'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('Roles', [ {
      name: 'Super Administrator',
      abbr: 'SA',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Travel Administrator',
      abbr: 'TA',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Travel Team Member',
      abbr: 'TTM',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Manager',
      abbr: 'MNG',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'supplier',
      abbr: 'SPL',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Requester',
      abbr: 'RQ',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('Roles', null, {})
  ])
};

