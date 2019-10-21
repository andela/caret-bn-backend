import validateRequest from '../../validation/validateRequest';
import locationChecker from './locationVerification';
import tripTypesChecker from './tripTypesVerification';
import datesVerification from './datesVerification';
import bookingsChecker from './bookingsVerification';
import destinationChecker from './destinationVerification';
import validationErrorFormatter from '../../utils/validationErrorFormatter';

export default async (req, res, next) => {

  const { body, user } = req;

  const { locationId, typeId, destinations } = body;

  const { error } = validateRequest(body);

  if (error) {
    return validationErrorFormatter(res, error);
  }

  await locationChecker.verify(res, locationId);

  destinations.forEach(async destination => {
    await locationChecker.verify(res, destination.locationId);
  });

  locationChecker.originalLocationCheck(res, destinations, locationId);
  locationChecker.twoPointVerificationCheck(res, destinations);

  await tripTypesChecker.verify(res, typeId);

  destinationChecker.verifyTypeCount(res, typeId, destinations);

  datesVerification.verify(res, destinations);
  bookingsChecker.verify(res, destinations);
  destinationChecker.verify(res, destinations);

  await destinationChecker.duplicationChecker(res, destinations, user);
  next();
};
