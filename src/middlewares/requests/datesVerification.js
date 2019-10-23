import Utilities from '../../utils/index';
import userServices from '../../services/userServices';

const verify = destinations => {
  for (let counter = 0; counter < destinations.length; counter += 1) {
    if (counter > 0) {
      if (destinations[counter].arrivalDate < destinations[counter - 1].departureDate) {
        return {
          invalidDates: true,
          datesErrorMessage: 'Arrival date must be after preceeding departure',
        };
      }
    }
  }

  return {
    invalidDates: false,
    messdatesErrorMessageage: '',
  };
};

const verifyTravelDates = async (departureDate, returnDate, destinations, user) => {
  const query = Utilities.userQueries.userRequests(user.payload);
  const { requests } = await userServices.findOne(query);

  const result = {
    dateVerificationError: false,
    dateVerificationMessage: ''
  };

  for (let counter = 0; counter < requests.length; counter += 1) {

    const request = requests[counter];

    const requestDestinationLength = request.destinations.length;
    if (departureDate === request.departureDate && returnDate === request.returnDate) {
      result.dateVerificationError = true;
      result.dateVerificationMessage = 'You are already scheduled to travel on these dates.';
      return result;
    }

    if (departureDate <= request.destinations[requestDestinationLength - 1].arrivalDate
      && departureDate >= request.departureDate
    ) {
      result.dateVerificationError = true;
      result.dateVerificationMessage = 'You are scheduled to travel within this period.';
      return result;
    }

  }

  return result;
};

module.exports = {
  verify, verifyTravelDates
};
