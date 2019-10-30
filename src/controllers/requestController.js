/* eslint-disable no-irregular-whitespace */
import Sequelize from 'sequelize';
import models from '../database/models';
import strings from '../utils/stringsUtil';
import text from '../utils/strings';
import responseHelper from '../utils/responseHelper';
import responseUtil from '../utils/responseUtil';
import userServices from '../services/userServices';
import requestServices from '../services/requestServices/requestServices';
import destinationController from './destinationController';
import searchRequestsServices from '../services/searchRequestsServices';
import Utilities from '../utils/index';
import notifServices from '../services/notifServices';
import notifSender from '../helpers/notifSender';
import findOneRequest from '../helpers/findOneRequest';
import findUser from '../helpers/findUser';

const { Op } = Sequelize;
const { SUCCESSFULLY_RETRIEVED_REQUESTS } = strings.requests;
const { NO_REQUESTS, ASSIGNED_REQUESTS } = text.user.requests;
const { notifSaver, notifBuilder } = notifServices;

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
    const query = Utilities.userQueries.userRequests(user.payload);
    const { requests } = await userServices.findOne(query, Utilities.queryScopes.responseScope);

    return responseUtil(res, 200, (!requests.length)
      ? NO_REQUESTS
      : SUCCESSFULLY_RETRIEVED_REQUESTS, requests);
  }

  static async changeStatus(req, res) {
    const { id } = req.params;
    const {
      statusId, activity, subject, responseMessage
    } = req;

    const requestToProcess = await findOneRequest({ id });
    const { userId } = requestToProcess;
    const user = await findUser({ id: userId });

    if (user.lineManager !== req.user.payload.id) {
      return responseHelper(res, text.user.requests.NOT_MANAGER, null, 403);
    }

    const APP_URL_BACKEND = `${req.protocol}://${req.headers.host}`;

    if (requestToProcess) {
      let request = await models.requests.update(
        { statusId },
        { where: { id }, returning: true, }
      );

      request = request[1][0].dataValues;

      const notification = await notifBuilder(request, request.userId, activity);
      await notifSaver(notification);
      await notifSender(subject, request, request.userId, notification, APP_URL_BACKEND);
      return responseHelper(res, responseMessage, null, 200);
    }
    return responseHelper(res, strings.requests.NOT_FOUND, null, 404);
  }

  static async updateRequest(req, res) {
    const { id } = req.request;
    try {
      await models.requests.update(req.body, {
        where: { id }, returning: true, raw: true,
      });
      const destination = req.body.destinations;
      destination.forEach(async element => {
        await models.destinations.update(element, {
          where: {
            [Op.and]: [{ requestId: id }, { id: element.id }]
          },
        });
      });
      const request = await allSearch({ id });
      return responseUtil(res, 200, strings.request.success.SUCCESS_UPDATE_REQUEST, request);
    } catch (error) {
      return res.status(500).json({ error: 'Something wrong' });
    }
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

  static async findOne(req, res) {
    const { id } = req.params;
    const { user } = req;
    const query = Utilities.requestQueries.singleRequest(id, user.payload.id);
    const request = await requestServices.findOne(query);
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.user.requests.SUCCESSFULLY_RETRIEVED_REQUESTS,
      request,
      200
    );
  }

  static async storeRequest(req, res) {
    const { body, user } = req;
    const request = await requestServices.createRequest(body, user.payload.id);
    return destinationController.storeDestination(req, res, body, user, request);
  }
}
