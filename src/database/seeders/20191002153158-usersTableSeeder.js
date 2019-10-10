'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('users', [{
      username: 'johndoe',
      email: 'johndoe@test.com',
      password: '$2b$10$vQp2ahUwAnRS.HHxNLK0pOQ/E41TRnxtlDJL.5vVRHsvL7DC9svNm',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('users', null, {})
  ])
};
