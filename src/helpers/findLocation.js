import models from '../database/models';

const findLocation = async option => {
  const locations = await models.locations.findAll({
    where: option,
  });
  return locations;
};

export default findLocation;
