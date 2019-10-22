'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('locations', [{
      name: 'Kigali Office',
      country: 'Rwanda',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Nairobi Office',
      country: 'Kenya',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kampala Office',
      country: 'Uganda',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Blantyre Office',
      country: 'Malawi',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lagos Office',
      country: 'Nigeria',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Accra Office',
      country: 'Ghana',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Harare Office',
      country: 'Zimbabwe',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('locations', null, {})
  ])
};
