'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('requests', [
      {
        typeId: 3,
        userId: 5,
        locationId: 3,
        statusId: 1,
        departureDate: '10-25-2019',
        returnDate: '11-25-2019',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        typeId: 3,
        userId: 3,
        locationId: 2,
        statusId: 2,
        departureDate: '10-25-2019',
        returnDate: '11-25-2019',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        typeId: 3,
        userId: 6,
        locationId: 2,
        statusId: 1,
        departureDate: '10-25-2019',
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        typeId: 3,
        userId: 6,
        locationId: 2,
        statusId: 1,
        departureDate: '10-25-2019',
        returnDate: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    {
      typeId: 3,
      userId: 5,
      locationId: 3,
      statusId: 1,
      departureDate: '10-25-2019',
      returnDate: '11-25-2019',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      typeId: 3,
      userId: 3,
      locationId: 2,
      statusId: 2,
      departureDate: '10-25-2019',
      returnDate: '11-25-2019',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      typeId: 3,
      userId: 6,
      locationId: 2,
      statusId: 1,
      departureDate: '10-25-2019',
      returnDate: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      typeId: 3,
      userId: 6,
      locationId: 2,
      statusId: 1,
      departureDate: '10-25-2019',
      returnDate: '11-25-2019',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      typeId: 3,
      userId: 6,
      locationId: 2,
      statusId: 1,
      departureDate: '10-25-2019',
      returnDate: null,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      typeId: 3,
      userId: 6,
      locationId: 2,
      statusId: 1,
      departureDate: '10-25-2019',
      returnDate: null,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('requests', null, {})
  ])
};
