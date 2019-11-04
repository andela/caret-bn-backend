import models from '../../database/models';

export const findOne = (query, scope = null) => models.requests.scope(scope)
  .findOne(query).then(user => user);

export const createRequest = async ({
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

export const allRequests = async query => models.requests.findAll(query)
  .then(requests => requests);
