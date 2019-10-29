import destinationServices from '../services/requestServices/destinationServices';
import requestServices from '../services/requestServices/requestServices';
import Utilities from '../utils/index';

export default class destinationController {
  static async storeDestination(res, body, user, request) {

    const { destinations } = body;

    await Promise.all(destinations.map(async destination => {
      await destinationServices.createDestination(destination, request.id);
    }));

    const query = Utilities.requestQueries.singleRequest(request.id, user.payload.id);

    const response = await requestServices.findOne(query);

    return Utilities.responseHelper(
      res,
      'Successfully Placed Request',
      response,
      201
    );

  }
}
