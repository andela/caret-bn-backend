import models from '../database/models';

const getOneAccommodation = data => {
  const accommodation = models.accommodations.findOne({
    where: data,
    attributes: { exclude: ['locationId', 'owner'] },
    include: [
      { model: models.users, as: 'ownerUser', attributes: ['id', 'email', 'phone'] },
      { model: models.locations, as: 'accommodationLocation', attributes: ['id', 'name'] },
    ]
  });
  return accommodation;
};

const getAllAccommodations = data => {
  const accommodations = models.accommodations.findAll({
    where: data,
    attributes: { exclude: ['locationId', 'owner'] },
    include: [
      { model: models.users, as: 'ownerUser', attributes: ['id', 'email', 'phone'] },
      { model: models.locations, as: 'accommodationLocation', attributes: ['id', 'name'] }
    ]
  });
  return accommodations;
};

export default { getOneAccommodation, getAllAccommodations };
