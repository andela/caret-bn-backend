import destinationServices from '../services/requestServices/destinationServices';
import Utilities from '../utils/index';

export default class destinationController {
  static async storeDestination(res, body, request) {

    const { destinations } = body;

    const mappedDestinations = await Promise.all(destinations.map(async destination => {
      const newDestination = await destinationServices.createDestination(destination, request.id);
      return newDestination;
    }));

    request.dataValues.destinations = mappedDestinations;

    return Utilities.responseHelper(
      res,
      'Successfully Placed Request',
      request,
      201
    );

  }
}
