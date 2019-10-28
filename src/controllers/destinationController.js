import destinationServices from '../services/requestServices/destinationServices';
import requestServices from '../services/requestServices/requestServices';
import Utilities from '../utils/index';
import notifServices from '../services/notifServices';
import notifSender from '../helpers/notifSender';

const { notifSaver, notifBuilder } = notifServices;

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

    const notification = await notifBuilder(request, lineManager, 'created');
    await notifSaver(notification);
    await notifSender('Request Created', request, lineManager, notification, APP_URL_BACKEND);

    return Utilities.responseHelper(
      res,
      'Successfully Placed Request',
      response,
      201
    );

  }
}
