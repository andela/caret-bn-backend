'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('bookings', [
      {
        "checkIn": "2019-11-15",
        "checkOut": "2019-11-30",
        "bookedSpace": 5,
        "accommodationId": 3,
        "userId": 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-11-15",
        "checkOut": "2019-11-30",
        "bookedSpace": 5,
        "accommodationId": 1,
        "userId": 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        "checkIn": "2019-11-15",
        "checkOut": "2019-11-30",
        "bookedSpace": 5,
        "accommodationId": 2,
        "userId": 11,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('bookings', null, {})
  ])
};
