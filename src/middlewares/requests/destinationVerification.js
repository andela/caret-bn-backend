import Utilities from '../../utils/index';
import userServices from '../../services/userServices';

const verify = (res, destinations) => {
  let FinalFlag;
  destinations.forEach((destination, index) => {
    if (index !== 0) {
      if (destinations[index - 1].isFinal === true) {
        return res.status(400).json({
          status: 400,
          message: 'You are already set the previous destination as your final.',
        });
      }
    }
    FinalFlag = destination.isFinal;
  });

  if (FinalFlag === false) {
    return res.status(400).json({
      status: 400,
      message: 'You need to set a destination as final.',
    });
  }
};


const duplicationChecker = async (res, destinations, user) => {
  const query = await Utilities.userQueries.userRequests(user.payload);
  const { requests } = await userServices.findOne(query);

  requests.forEach(request => {
    request.destinations.forEach(destination => {
      destinations.forEach(currentDestination => {
        if (
          currentDestination.departureDate === destination.departureDate
          || currentDestination.arrivalDate === destination.arrivalDate
        ) {
          return res.status(400).json({
            status: 400,
            message: 'You are already set to travel on this date[s]. Please correct dates.',
          });
        }
      });
    });
  });
};

const verifyTypeCount = (res, typeId, destinations) => {
  if ((typeId === 1 && destinations.length > 1) || (typeId === 2 && destinations.length > 1)) {
    return res.status(400).json({
      status: 400,
      message: 'Only one destination is allowed in this trip type',
    });
  }
};

module.exports = {
  verify, duplicationChecker, verifyTypeCount,
};
