'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('users', [
      {
        username: 'johndoe',
        email: 'johndoe@test.com',
        password: '$2b$10$vQp2ahUwAnRS.HHxNLK0pOQ/E41TRnxtlDJL.5vVRHsvL7DC9svNm',
        isVerified: false,
        lineManager: 8,
        role: 6,
        emailNotif: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
      username: 'admin',
      role: 1,
      emailNotif: true,
      phone: '078567554',
      gender: 'male',
      dob: '2014-01-01 00:00:00+02',
      country: 'Rwanda',
      language: 'English',
      currency: 'USD',
      company: 'Andela',
      department: 'IT',
      lineManager: '2',
      email: 'admin@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      password: '$2b$10$vQp2ahUwAnRS.HHxNLK0pOQ/E41TRnxtlDJL.5vVRHsvL7DC9svNm',
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      username: 'g-host',
      email: 'ghost@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      lineManager: 8,
      role: 6,
      emailNotif: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'caretUser',
      email: 'user@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      lineManager: 8,
      role: 5,
      emailNotif: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
 
    {
      username: 'alain',
      email: 'alain@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      lineManager: 8,
      role: 1,
      emailNotif: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'mateso',
      email: 'mateso@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      lineManager: 8,
      role: 6,
      emailNotif: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'demoSupplier',
      email: 'supplier@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      lineManager: 8,
      role: 5,
      emailNotif: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'demoManager',
      email: 'manager@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      lineManager: 8,
      role: 4,
      emailNotif: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'anotherManager',
      email: 'anothermanager@caretbn.com',
      password: '$2b$10$VyldWKIyiuVSqZYjmz4u8OepsFJFKzQipOQzhrhQKthgn8a9OI2Au',
      isVerified: true,
      lineManager: 8,
      role: 4,
      emailNotif: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('users', null, {})
  ])
};