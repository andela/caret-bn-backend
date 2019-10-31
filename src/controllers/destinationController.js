import destinationServices from '../services/requestServices/destinationServices';
import requestServices from '../services/requestServices/requestServices';
import Utilities from '../utils/index';
import notifSender from '../helpers/notifSender';


export default class destinationController {
  static async storeDestination(req, res, body, user, request) {
    const { destinations } = body;
    const APP_URL_BACKEND = `${req.protocol}://${req.headers.host}`;

    await Promise.all(destinations.map(async destination => {
      await destinationServices.createDestination(destination, request.id);
    }));

    const query = Utilities.requestQueries.singleRequest(request.id, user.payload.id);

    const response = await requestServices.findOne(query);

    const { lineManager } = user.payload;

    await notifSender('Request Created', request, lineManager, APP_URL_BACKEND, 'created');

    return Utilities.responseHelper(
      res,
      'Successfully Placed Request',
      response,
      201
    );

  }
}
