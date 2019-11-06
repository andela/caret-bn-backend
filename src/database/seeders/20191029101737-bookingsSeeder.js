'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('bookings', [
      {
        "checkIn": "2019-11-15",
        "checkOut": "2019-11-30",
        "bookedSpace": 5,
        "accommodationId": 3,
        "userId": 3,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-11-15",
        "checkOut": "2019-11-30",
        "bookedSpace": 5,
        "accommodationId": 2,
        "userId": 3,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-11-15",
        "checkOut": "2019-11-30",
        "bookedSpace": 5,
        "accommodationId": 2,
        "userId": 3,
        statusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-09-15",
        "checkOut": "2019-09-30",
        "bookedSpace": 5,
        "accommodationId": 4,
        "userId": 5,
        statusId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-09-15",
        "checkOut": "2019-09-30",
        "bookedSpace": 5,
        "accommodationId": 6,
        "userId": 5,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-09-15",
        "checkOut": "2019-09-30",
        "bookedSpace": 5,
        "accommodationId": 5,
        "userId": 5,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-11-15",
        "checkOut": "2019-11-30",
        "bookedSpace": 1,
        "accommodationId": 5,
        "userId": 5,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-11-15",
        "checkOut": "2019-11-30",
        "bookedSpace": 1,
        "accommodationId": 5,
        "userId": 5,
        statusId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('bookings', null, {})
  ])
};
