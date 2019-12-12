import validateRequest from '../../validation/validateRequest';
import locationChecker from './locationVerification';
import tripTypesChecker from './tripTypesVerification';
import datesVerification from './datesVerification';
import bookingsChecker from './bookingsVerification';
import destinationChecker from './destinationVerification';
import validationErrorFormatter from '../../utils/validationErrorFormatter';
import Utilities from '../../utils/index';
import strings from '../../utils/stringsUtil';

export default async (req, res, next) => {

  const { body, user } = req;
  const {
    locationId, typeId, departureDate, returnDate, destinations
  } = body;

  const { error } = validateRequest(body);

  if (error) {
    return validationErrorFormatter(res, error);
  }

  if (user.payload.role === 5) {
    return Utilities.responseHelper(
      res,
      'Suppliers are restricted from making travel requests',
      null,
      403
    );
  }

  const result = await locationChecker.getLocationById(locationId);

  if (!result) {
    return Utilities.responseHelper(
      res,
      strings.request.error.NO_LOCATION,
      null,
      400
    );
  }

  try {
    await Promise.resolve(locationChecker.verifyDestinations(destinations));
  } catch (err) {
    return Utilities.responseHelper(
      res,
      err.message,
      null,
      400
    );
  }

  try {
    await Promise.resolve(locationChecker.originalLocationCheck(destinations, locationId));
  } catch (err) {
    return Utilities.responseHelper(
      res,
      err.message,
      null,
      400
    );
  }


  try {
    await Promise.resolve(locationChecker.twoPointVerificationCheck(destinations));
  } catch (err) {
    return Utilities.responseHelper(
      res,
      err.message,
      null,
      400
    );
  }

  const tripExists = await tripTypesChecker.verify(typeId);
  if (!tripExists) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.validation.requests.types.DOES_NOT_EXIST,
      null,
      400
    );
  }

  // const { validDates, datesErrorMessage } = await datesVerification.verify(destinations);
  // if (!validDates) {
  //   return Utilities.responseHelper(
  //     res,
  //     datesErrorMessage,
  //     null,
  //     400
  //   );
  // }

  const { returnDatesError, returnDatesErrorMessage } = datesVerification.verifyDateSanity(body);
  if (returnDatesError) {
    return Utilities.responseHelper(
      res,
      returnDatesErrorMessage,
      null,
      400
    );
  }

  try {
    await bookingsChecker.checkMultiple(destinations);
  } catch (err) {
    return Utilities.responseHelper(
      res,
      err.message,
      null,
      400
    );
  }

  try {
    await bookingsChecker.checkOwnership(destinations, user.payload.id);
  } catch (err) {
    return Utilities.responseHelper(
      res,
      err.message,
      null,
      400
    );
  }

  try {
    await destinationChecker.verify(destinations);
  } catch (err) {
    return Utilities.responseHelper(
      res,
      err.message,
      null,
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
      null,
      400
    );

  }
  next();
};
