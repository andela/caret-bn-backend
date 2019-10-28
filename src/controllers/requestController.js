import models from '../database/models';
import strings from '../utils/stringsUtil';
import text from '../utils/strings';
import responseHelper from '../utils/responseHelper';
import responseUtil from '../utils/responseUtil';
import userServices from '../services/userServices';
import searchRequestsServices from '../services/searchRequestsServices';
import Utilities from '../utils/index';
import findRequests from '../helpers/findRequests';

const {
  APPROVED, REJECTED, SUCCESSFULLY_RETRIEVED_REQUESTS
} = strings.requests;
const { NO_REQUESTS, ASSIGNED_REQUESTS } = text.user.requests;

const { allSearch } = searchRequestsServices;

export default class requestController {

  static async viewManagerRequests(req, res) {
    const { id: lineManager } = req.user.payload;

    const users = await models.users.findAll({
      where: { lineManager },
      attributes: ['id', 'username', 'email'],
      include: [
        {
          model: models.requests,
          where: { statusId: [1, 2, 3] },
          attributes: ['id', 'createdAt'],
          include: [
            { model: models.tripTypes, as: 'type', attributes: ['id', 'name'] },
            { model: models.requestStatus, as: 'status', attributes: ['id', 'name'] },
            { model: models.locations, as: 'origin', attributes: ['id', 'name', 'country'] },
            { model: models.destinations, attributes: ['id', 'arrivalDate', 'departureDate', 'reasons'], include: [{ model: models.locations, as: 'location', attributes: ['name'] }] }
          ]
        },
      ]
    });
    return responseUtil(res, 200, (!users.length)
      ? NO_REQUESTS
      : ASSIGNED_REQUESTS, users);
  }

  static async viewMyRequests({ user }, res) {
    const query = Utilities.requestQueries.userRequests(user.payload);
    const { requests } = await userServices.findOne(query, Utilities.queryScopes.responseScope);

    return responseUtil(res, 200, (!requests.length)
      ? NO_REQUESTS
      : SUCCESSFULLY_RETRIEVED_REQUESTS, requests);
  }

  static async approveRequest(req, res) {
    const { id } = req.params;

    const requestToApprove = findRequests(req);

    if (requestToApprove) {
      await models.requests.update({ statusId: 3 }, { where: { id } });

      return responseHelper(res, APPROVED, null, 200);
    }
    return responseHelper(res, strings.requests.NOT_FOUND, null, 404);
  }

  static async rejectRequest(req, res) {
    const { id } = req.params;

    const requestToReject = findRequests(req);

    if (requestToReject) {
      await models.requests.update({ statusId: 2 }, { where: { id } });

      return responseHelper(res, REJECTED, null, 200);
    }
    return responseHelper(res, strings.user.requests.NOT_FOUND, null, 404);

  }

  static async searchRequests(req, res) {
    const requests = await allSearch(req.body);

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
      Utilities.stringsHelper.user.requests.SUCCESSFULLY_FOUND_REQUESTS,
      requests,
      200
    );
  }
}
