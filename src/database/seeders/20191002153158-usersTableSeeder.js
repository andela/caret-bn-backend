'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('users', [{
      username: 'johndoe',
      email: 'johndoe@test.com',
      password: '$2b$10$vQp2ahUwAnRS.HHxNLK0pOQ/E41TRnxtlDJL.5vVRHsvL7DC9svNm',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'caretUser',
      email: 'user@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'g-host',
      email: 'ghost@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('users', null, {})
  ])
};
