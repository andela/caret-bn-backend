'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('accommodations', [
      {
        name: 'Isimbi Hotel',
        description: 'Lorem Ipsum',
        location: 1,
        availableSpace: '25',
        cost: 100,
        highlights: 'Lorem Ipsum',
        amenities: 'Lorem Ipasum',
        owner: 2,
        images: '"http://res.cloudinary.com/codeal/image/upload/v15712/19161/itwk2ro51fa8luasp8j.png"',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'El Gorillaz',
        description: 'Kampolama',
        location: 4,
        availableSpace: '35',
        cost: 50,
        highlights: 'Kampolama',
        amenities: 'Kampolama',
        owner: 2,
        images: '"http://res.cloudinary.com/codeal/image/upload/v15712/19161/itwk2ro51fa8laspg8j.png"',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Moto Ni Moto Inn',
        description: 'BoneFire Camp',
        location: 3,
        availableSpace: '20',
        cost: 50,
        highlights: 'BoneFire Camp',
        amenities: 'BoneFire Camp',
        owner: 3,
        images: '"http://res.cloudinary.com/codeal/image/upload/v15712/19161/i2ro51fa8luaspg8j.png"',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('accommodations', null, {})
  ])
};
