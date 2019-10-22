import userServices from '../services/userServices';
import Utilities from '../utils/index';

export default class requestController {

  static async viewRequests({ user }, res) {
    const query = Utilities.requestQueries.userRequests(user.payload);
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
}
