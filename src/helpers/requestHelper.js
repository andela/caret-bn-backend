import sequelize from 'sequelize';
import models from '../database/models';

const findOneRequest = properties => {
  const request = models.requests.findOne({
    where: properties,
    raw: true
  });
  return request;
};

const findStatRequest = req => {
  const { Op } = sequelize;
  const { startDate, endDate } = req.query;

  const requestResult = models.requests.findAll({
    where: {
      userId: req.user.payload.id,
      statusId: 3,
      departureDate: {
        [Op.between]: [startDate, endDate],
      }
    },
    attributes: { exclude: ['typeId', 'userId', 'statusId', 'locationId'] },
    include: [
      { model: models.destinations, attributes: ['id', 'arrivalDate', 'departureDate', 'reasons'], include: [{ model: models.locations, as: 'location', attributes: ['name'] }] },
      { model: models.locations, as: 'origin', attributes: ['id', 'name', 'country'] },
      { model: models.requestStatus, as: 'status', attributes: ['id', 'name'] },
      { model: models.tripTypes, as: 'type', attributes: ['id', 'name'] },
    ]
  });
  return requestResult;
};

export default { findOneRequest, findStatRequest };
