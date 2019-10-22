'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('users', [{
      username: 'johndoe',
      email: 'johndoe@test.com',
      password: '$2b$10$vQp2ahUwAnRS.HHxNLK0pOQ/E41TRnxtlDJL.5vVRHsvL7DC9svNm',
      isVerified: true,
      phone: '+250788716711',
      gender: 'M',
      country: 'Rwanda',
      language:'french',
      currency: 'frw',
      company: 'Andela',
      department: 'IT',
      role: 'supplier',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'caretUser',
      email: 'user@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      role: 'supplier',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'g-host',
      email: 'ghost@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      role: 'requester',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'alain',
      email: 'alain@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'mateso',
      email: 'mateso@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      role: 'requester',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('users', null, {})
  ])
};
