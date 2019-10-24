import Utilities from '../../utils/index';
import userServices from '../../services/userServices';
import dateValidator from '../../helpers/datesValidator';

const verify = async destinations => {
  const response = {
    validDates: true,
    datesErrorMessage: '',
  };
  await destinations.map((destination, index) => {
    if (index > 0) {
      const areDatesInvalid = dateValidator(
        destinations[index - 1].departureDate,
        destination.arrivalDate
      );

      if (areDatesInvalid) {
        response.validDates = false;
        response.datesErrorMessage = 'Arrival date must be after preceeding departure';
      }
    }
  });
  return response;
};

const verifyDateSanity = request => {
  const { destinations } = request;

  const response = {
    returnDatesError: false,
    returnDatesErrorMessage: null,
  };

  if (request.returnDate) {
    if (dateValidator(destinations[destinations.length - 1].departureDate, request.returnDate)) {
      response.returnDatesError = true;
      response.returnDatesErrorMessage = 'Please check your return date. Return listed as before final departure';
    }
  }

  return response;
};

const verifyTravelDates = async (departureDate, returnDate, destinations, user) => {
  const query = Utilities.userQueries.userRequests(user.payload);
  const { requests } = await userServices.findOne(query);
  const result = {
    dateVerificationError: false,
    dateVerificationMessage: ''
  };

  requests.map(request => {
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
  });
  return result;
};

module.exports = {
  verify, verifyTravelDates, verifyDateSanity
};
