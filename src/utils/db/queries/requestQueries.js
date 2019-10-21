import database from '../../../database/models';

const singleRequest = id => {
  const query = {
    where: { id },
    include: [
      {
        model: database.tripTypes,
        as: 'type',
        attributes: [
          'id', 'name'
        ],
      },
      {
        model: database.requestStatus,
        as: 'status',
        attributes: [
          'id', 'name'
        ],
      },
      {
        model: database.locations,
        as: 'origin',
        attributes: [
          'id', 'name', 'country'
        ],
      },
      {
        model: database.destinations,
        attributes: [
          'id', 'arrivalDate', 'departureDate', 'reasons', 'isFinal'
        ],
        include: [
          {
            model: database.locations,
            attributes: [
              'id', 'name', 'country'
            ],
            as: 'location'
          }
        ]
      },
    ]
  };
  return query;
};

module.exports = {
  singleRequest
};
