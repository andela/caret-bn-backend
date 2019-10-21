import models from '../../database/models';

const findOne = (query, scope = null) => models.destinations.scope(scope)
  .findOne(query).then(destination => destination);

const createDestination = async ({
  arrivalDate, departureDate,
  reasons, isFinal,
  locationId, bookingId
},
  requestId) => {

  const destination = await models.destinations.create({
    arrivalDate,
    departureDate,
    reasons,
    isFinal,
    locationId,
    bookingId,
    requestId
  });
  return destination;
};

module.exports = {
  createDestination, findOne
};
