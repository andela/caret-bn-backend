'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('destinations', [
      {
        locationId: 5,
        bookingId: 1,
        arrivalDate: '10-10-2019',
        departureDate: '10-25-2019',
        requestId: 1,
        reasons: 'Meeting the marketing director',
        isFinal: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 6,
        bookingId: 2,
        arrivalDate: '10-25-2019',
        departureDate: '10-27-2019',
        requestId: 1,
        reasons: 'Meeting the managing partner',
        isFinal: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 6,
        bookingId: 2,
        arrivalDate: '10-27-2019',
        departureDate: '11-02-2019',
        requestId: 1,
        reasons: 'Meeting the managing partner',
        isFinal: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 3,
        bookingId: 2,
        arrivalDate: '10-25-2019',
        departureDate: '10-27-2019',
        requestId: 2,
        reasons: 'Business reasons',
        isFinal: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 6,
        bookingId: 2,
        arrivalDate: '10-27-2019',
        departureDate: '11-02-2019',
        requestId: 3,
        reasons: 'Partner Company Meeting',
        isFinal: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 6,
        bookingId: 2,
        arrivalDate: '10-29-2019',
        departureDate: null,
        requestId: 4,
        reasons: 'Partner Company Meeting',
        isFinal: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 5,
        bookingId: 2,
        arrivalDate: '10-29-2019',
        departureDate: null,
        requestId: 2,
        reasons: 'Partner Company Meeting',
        isFinal: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        locationId: 5,
        bookingId: 2,
        arrivalDate: '10-29-2019',
        departureDate: null,
        requestId: 6,
        reasons: 'Partner Company Meeting',
        isFinal: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('destinations', null, {})
  ])
};
