import models from '../../../database/models';
// eslint-disable-next-line import/prefer-default-export
export const allDestinations = {
  where: {
    statusId: 3
  },
  include: [
    {
      model: models.destinations,
      as: 'destinations',
      include: [
        {
          model: models.locations,
          as: 'location'
        }
      ]
    }
  ]
};
