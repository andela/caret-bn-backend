import database from '../../../database/models';

const userRequests = ({ id }) => {
  const query = {
    where: { id },
    include: [
      {
        model: database.requests,
        attributes: [
          'createdAt'
        ],
        include: [
          {
            model: database.tripTypes,
            as: 'type',
            attributes: [
              'name'
            ],
          },
          {
            model: database.requestStatus,
            as: 'status',
            attributes: [
              'name'
            ],
          },
          {
            model: database.locations,
            as: 'origin',
            attributes: [
              'name', 'country'
            ],
          },
          {
            model: database.destinations,
            attributes: [
              'arrivalDate', 'departureDate', 'reasons', 'isFinal'
            ],
            include: [
              {
                model: database.locations,
                attributes: [
                  'name', 'country'
                ],
                as: 'location'
              }
            ]
          },
        ]
      }
    ]
  };
  return query;
};

module.exports = {
  userRequests
};
