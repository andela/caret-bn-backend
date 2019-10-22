import userServices from '../services/userServices';
import requestServices from '../services/requestServices/requestServices';
import destinationController from './destinationController';
import Utilities from '../utils/index';

export default class requestController {

  static async viewRequests({ user }, res) {
    const query = Utilities.userQueries.userRequests(user.payload);
    const { requests } = await userServices.findOne(query, Utilities.queryScopes.responseScope);

    if (!requests.length) {
      return Utilities.responseHelper(
        res,
        Utilities.stringsHelper.user.requests.NO_REQUESTS,
        requests,
        404
      );
    }

    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.user.requests.SUCCESSFULLY_RETRIEVED_REQUESTS,
      requests,
      200
    );
  }


  static async storeRequest({ body, user }, res) {
    const request = await requestServices.createRequest(body, user.payload.id);
    return destinationController.storeDestination(res, body, request);
  }
}
