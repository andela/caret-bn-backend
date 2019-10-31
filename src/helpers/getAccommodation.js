/* eslint-disable  max-len */
import models from '../database/models';
import { getRatings } from './ratingsHelper';

const getOneAccommodation = (data, userId) => {
  const accommodation = models.accommodations.findOne({
    where: data,
    attributes: { exclude: ['locationId', 'owner'] },
    include: [
      { model: models.users, as: 'ownerUser', attributes: ['id', 'email', 'phone'] },
      { model: models.locations, as: 'accommodationLocation', attributes: ['id', 'name'] },
    ]
  }).then(accommodation => getRatings(accommodation, userId));
  return accommodation;
};

const getAllAccommodations = async (data, userId) => models.accommodations.findAll({
  where: data,
  attributes: { exclude: ['locationId', 'owner'] },
  include: [
    { model: models.users, as: 'ownerUser', attributes: ['id', 'email', 'phone'] },
    { model: models.locations, as: 'accommodationLocation', attributes: ['id', 'name'] }
  ]
}).then(accommodations => Promise.all(accommodations.map(async accommodation => getRatings(accommodation, userId)))
  .then(accommodations => accommodations));


export default { getOneAccommodation, getAllAccommodations };
