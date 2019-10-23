import models from '../../database/models';

const createRequest = async ({
  typeId, locationId, departureDate, returnDate
}, userId) => {

  const request = await models.requests.create({
    typeId,
    locationId,
    userId,
    departureDate,
    returnDate,
    statusId: 1
  });
  return request;

};

module.exports = {
  createRequest
};
