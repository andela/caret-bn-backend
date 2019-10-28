'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('notifications', [
      {
        requestId: 2,
        userNotified: 8,
        activity: 'created',
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        requestId: 2,
        userNotified: 3,
        activity: 'rejected',
        isRead: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        requestId: 2,
        userNotified: 3,
        activity: 'approved',
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('notifications', null, {})
  ])
};
