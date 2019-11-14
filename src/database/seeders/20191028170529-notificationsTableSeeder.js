'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('notifications', [
      {
        requestId: 2,
        userNotified: 8,
        activity: 'A request has been created. Click here to view: https://caret-bn-backend-staging.herokuapp.com/api/v1/requests/2.',
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        timestamp: new Date()
      },
      {
        requestId: 2,
        userNotified: 3,
        activity: 'A request has been rejected. Click here to view: https://caret-bn-backend-staging.herokuapp.com/api/v1/requests/2.',
        isRead: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        timestamp: new Date()
      },
      {
        requestId: 2,
        userNotified: 3,
        activity: 'A request has been approved. Click here to view: https://caret-bn-backend-staging.herokuapp.com/api/v1/requests/2.',
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        timestamp: new Date()
      },
      {
        requestId: 2,
        userNotified: 3,
        activity: 'A request has been approved. Click here to view: https://caret-bn-backend-staging.herokuapp.com/api/v1/requests/2.',
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        timestamp: new Date()
      },
      {
        requestId: 2,
        userNotified: 3,
        activity: 'A request has been approved. Click here to view: https://caret-bn-backend-staging.herokuapp.com/api/v1/requests/2.',
        isRead: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        timestamp: new Date()
      },

    ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('notifications', null, {})
  ])
};
