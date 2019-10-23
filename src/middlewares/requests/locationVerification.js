import requestServices from '../../services/requestServices/index';

const verify = async id => {
  const locationQuery = id => (
    {
      where: {
        id
      }
    }
  );
  const count = await requestServices.locations.countAll(locationQuery(id));
  if (count === 0) {
    return false;
  }
  return true;
};


const originalLocationCheck = (destinations, locationId) => {
  for (let counter = 0; counter < destinations.length; counter += 1) {
    if (destinations[counter].locationId === locationId) {
      return true;
    }
  }
  return false;
};


const twoPointVerificationCheck = destinations => {
  for (let counter = 0; counter < destinations.length; counter += 1) {
    if (counter > 0) {
      if (destinations[counter].locationId === destinations[counter - 1].locationId) {
        return true;
      }
    }
  }
  return false;
};


module.exports = {
  verify, twoPointVerificationCheck, originalLocationCheck
};
