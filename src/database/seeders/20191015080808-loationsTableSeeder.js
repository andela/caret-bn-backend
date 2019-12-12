'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkInsert('locations', [{
      name: 'Kigali Office',
      country: 'Rwanda',
      images: '"https://res.cloudinary.com/ddypcld8o/image/upload/v1576593282/fy9qcujbszorhaiupzgu.jpg"',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Nairobi Office',
      country: 'Kenya',
      images: '"https://res.cloudinary.com/ddypcld8o/image/upload/v1576593282/sndkzhko8zyjcnzuu4ar.jpg"',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Kampala Office',
      country: 'Uganda',
      images: '"https://res.cloudinary.com/ddypcld8o/image/upload/v1576745596/qgi033mls2afemkhn71f.jpg"',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Blantyre Office',
      country: 'Malawi',
      images: '"https://res.cloudinary.com/ddypcld8o/image/upload/v1576760919/tgl2z4r3bhp6yxf5b6bp.jpg"',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Lagos Office',
      country: 'Nigeria',
      images: '"https://res.cloudinary.com/ddypcld8o/image/upload/v1576593282/fy9qcujbszorhaiupzgu.jpg"',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Accra Office',
      country: 'Ghana',
      images: '"https://res.cloudinary.com/ddypcld8o/image/upload/v1576593282/sndkzhko8zyjcnzuu4ar.jpg"',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Harare Office',
      country: 'Zimbabwe',
      images: '"https://res.cloudinary.com/ddypcld8o/image/upload/v1576760919/tgl2z4r3bhp6yxf5b6bp.jpg"',
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ])
  ]),

  down: (queryInterface, Sequelize) => Promise.all([
    queryInterface.bulkDelete('locations', null, {})
  ])
};
