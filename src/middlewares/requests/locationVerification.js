/* eslint-disable no-else-return */
/* eslint-disable  implicit-arrow-linebreak */
import requestServices from '../../services/requestServices/index';

const getLocationById = id => {
  const query = {
    where: {
      id
    }
  };
  return requestServices.locations.findOne(query).then(result => result);
};

const verifyDestinations = destinations => new Promise(
  (resolve, reject) => Promise.all(destinations.map(async destination => {
    const location = await Promise.resolve(getLocationById(destination.locationId));
    if (!location) {
      return false;
    } else {
      return true;
    }
  })).then(res => {
    const resultCount = res.filter(result => result === false);
    if (resultCount.length === 0) {
      resolve();
    } else {
      reject(new Error('Location does not exist on the system.'));
    }
  })
);

const originalLocationCheck = (destinations, locationId) =>
  new Promise((resolve, reject) => Promise.all(destinations.map(async destination => {
    if (destination.locationId === locationId) {
      return true;
    } else {
      return false;
    }
  })).then(res => {
    const resultCount = res.filter(result => result === true);
    if (resultCount.length === 0) {
      resolve(true);
    } else {
      reject(new Error('Cannot travel to the same location.'));
    }
  }));

const twoPointVerificationCheck = destinations =>
  new Promise((resolve, reject) =>
    Promise.all(destinations.map(async (destination, index) => {
      if (index > 0) {
        if (destination.locationId === destinations[index - 1].locationId) {
          return true;
        } else {
          return false;
        }
      }
    })).then(res => {
      const resultCount = res.filter(result => result === true);
      if (resultCount.length === 0) {
        resolve(true);
      } else {
        reject(new Error('Cannot travel to the same location.'));
      }
    }));

module.exports = {
  verifyDestinations, twoPointVerificationCheck, originalLocationCheck, getLocationById
};
