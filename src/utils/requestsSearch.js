import { Op } from 'sequelize';
import moment from 'moment';
import models from '../database/models';

const checkProperty = (queryObject, queryProperty, object, property) => {
  if (Object.keys(object).includes(property)) {
    if (property === 'reasons') {
      queryObject[queryProperty] = { [Op.iLike]: `%${object.reasons}%` };
    } else {
      queryObject[queryProperty] = object[property];
    }
  }
};

const requestsFinder = async (table, array, propertyToPush, searchingOptions) => {
  await table.findAll({
    where: searchingOptions,
  }).then(items => items.forEach(item => {
    array.push(item[propertyToPush]);
  }));
};

const requestsSearch = async options => {
  const requestOptions = {};
  const destinationOptions = {};

  checkProperty(requestOptions, 'id', options, 'id');
  checkProperty(requestOptions, 'userId', options, 'userId');
  checkProperty(requestOptions, 'locationId', options, 'origin');
  checkProperty(requestOptions, 'departureDate', options, 'departureDate');
  checkProperty(requestOptions, 'statusId', options, 'statusId');

  const requestsArray = [];
  const destinationsArray = [];

  checkProperty(destinationOptions, 'reasons', options, 'reasons');
  checkProperty(destinationOptions, 'locationId', options, 'destination');

  await requestsFinder(models.requests, requestsArray, 'id', requestOptions);
  await requestsFinder(models.destinations, destinationsArray, 'requestId', destinationOptions);

  const matchingRequests = [];
  requestsArray.forEach(request => {
    if (destinationsArray.includes(request)) {
      matchingRequests.push(request);
    }
  });

  const destinations = await models.destinations.findAll({
    where: { requestId: matchingRequests },
    attributes: { exclude: ['locationId', 'createdAt', 'updatedAt'] },
    include: [ // Notice include takes an ARRAY
      {
        model: models.locations,
        as: 'location',
        attributes: ['id', 'name']
      }],
  });

  const requests = await models.requests.findAll({
    where: { id: matchingRequests },
    attributes: { exclude: ['locationId', 'typeId', 'statusId', 'userId'] },
    include: [ // Notice include takes an ARRAY
      {
        model: models.users,
        as: 'requester',
        attributes: ['id', 'username', 'email']
      },
      {
        model: models.locations,
        as: 'origin',
        attributes: ['id', 'name', 'country']
      },
      {
        model: models.tripTypes,
        as: 'type',
        attributes: ['id', 'name']
      },
      {
        model: models.requestStatus,
        as: 'status',
        attributes: ['id', 'name']
      }],
  });
  requests.forEach(request => {
    request.dataValues.destinations = [];
    destinations.forEach(destination => {
      if (destination.requestId === request.id) {
        request.dataValues.destinations.push(destination);
      }
    });
  });

  let durations;

  if (Object.keys(options).includes('duration')) {
    const { duration } = options;
    durations = duration;
  }

  const requestsByDuration = [];

  if (durations) {
    requests.forEach(request => {
      const { departureDate } = request.dataValues;
      let { returnDate } = request.dataValues;
      if (!returnDate) {
        // eslint-disable-next-line max-len
        const lastDestination = request.dataValues.destinations[request.dataValues.destinations.length - 1].dataValues;
        if (!lastDestination.departureDate) {
          returnDate = lastDestination.arrivalDate;
        } else {
          returnDate = lastDestination.departureDate;
        }
      }
      // eslint-disable-next-line max-len
      const destinationDuration = moment.duration(moment(returnDate).diff(moment(departureDate))).asDays();
      if (destinationDuration === durations) {
        requestsByDuration.push(request);
      }
    });
    return requestsByDuration;
  }

  return requests;
};

export default requestsSearch;
