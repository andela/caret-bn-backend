'use strict';
module.exports = {
 up: (queryInterface, Sequelize) => Promise.all([
   queryInterface.bulkInsert('comments', [
     {
       comment: 'i want to go to andela kigali',
       userId: 3,
       requestId: 3,
       deleted: false,
       createdAt: new Date(),
       updatedAt: new Date()
     }
 ])
 ]),
 down: (queryInterface, Sequelize) => Promise.all([
   queryInterface.bulkDelete('comments', null, {})
 ])
};