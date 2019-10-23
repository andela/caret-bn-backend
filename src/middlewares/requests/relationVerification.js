import validateRequest from '../../validation/validateRequest';
import locationChecker from './locationVerification';
import tripTypesChecker from './tripTypesVerification';
import datesVerification from './datesVerification';
import bookingsChecker from './bookingsVerification';
import destinationChecker from './destinationVerification';
import validationErrorFormatter from '../../utils/validationErrorFormatter';
import Utilities from '../../utils/index';

export default async (req, res, next) => {

  const { body, user } = req;

  const {
    locationId, typeId, departureDate, returnDate, destinations
  } = body;

  const { error } = validateRequest(body);

  if (error) {
    return validationErrorFormatter(res, error);
  }

  const locationExists = await locationChecker.verify(locationId);
  if (!locationExists) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.validation.requests.locations.DOES_NOT_EXIST,
      '',
      400
    );
  }

  /*  eslint-disable no-await-in-loop */
  for (let counter = 0; counter < destinations.length; counter += 1) {
    const locationExists = await locationChecker.verify(destinations[counter].locationId);
    if (!locationExists) {
      return Utilities.responseHelper(
        res,
        Utilities.stringsHelper.validation.requests.locations.DOES_NOT_EXIST,
        '',
        400
      );
    }
  }

  const originalLocation = locationChecker.originalLocationCheck(destinations, locationId);
  if (originalLocation) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.validation.requests.locations.TRAVEL_TO_ORIGIN,
      '',
      400
    );
  }


  const travellingToSameLocation = locationChecker.twoPointVerificationCheck(destinations);
  if (travellingToSameLocation) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.validation.requests.locations.TRAVEL_TO_SAME_LOCATION,
      '',
      400
    );
  }

  const tripExists = await tripTypesChecker.verify(typeId);
  if (!tripExists) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.validation.requests.types.DOES_NOT_EXIST,
      '',
      400
    );
  }

  const { invalidDates, datesErrorMessage } = datesVerification.verify(destinations);
  if (invalidDates) {
    return Utilities.responseHelper(
      res,
      datesErrorMessage,
      '',
      400
    );
  }

  const multipleBookingsMade = bookingsChecker.checkMultiple(destinations);
  if (multipleBookingsMade) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.validation.requests.bookings.MULTIPLE_BOOKINGS,
      '',
      400
    );
  }

  const { flagError, flagMessage } = destinationChecker.verify(destinations);

  if (flagError) {
    return Utilities.responseHelper(
      res,
      flagMessage,
      '',
      400
    );
  }

  const {
    dateVerificationError, dateVerificationMessage
  } = await datesVerification.verifyTravelDates(departureDate, returnDate, destinations, user);

  if (dateVerificationError) {
    return Utilities.responseHelper(
      res,
      dateVerificationMessage,
      '',
      400
    );
  }

  next();
};
