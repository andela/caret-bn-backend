import requestServices from '../../services/requestServices/index';

const verify = async (res, id) => {
  const locationQuery = id => (
    {
      where: {
        id
      }
    }
  );

  const count = await requestServices.locations.countAll(locationQuery(id));
  if (count === 0) {
    return res.status(400).json({
      status: 400,
      message: 'Location Does not exist on the system.'
    });
  }
};


const originalLocationCheck = (res, destinations, locationId) => {
  destinations.forEach(async destination => {
    if (destination.locationId === locationId) {
      return res.status(400).json({
        status: 400,
        message: 'You cannot travel to original location.'
      });
    }
  });
};


const twoPointVerificationCheck = (res, destinations) => {
  destinations.forEach(async (destination, index) => {
    if (index !== 0) {
      if (destination.locationId === destinations[index - 1].locationId) {
        return res.status(400).json({
          status: 400,
          message: 'You cannot travel to the same location.'
        });
      }
    }
  });
};


module.exports = {
  verify, twoPointVerificationCheck, originalLocationCheck
};
