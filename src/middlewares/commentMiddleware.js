/* eslint-disable no-irregular-whitespace */
import responseError from '../utils/responseError';
import string from '../utils/stringsUtil';
import models from '../database/models';

const { requests, users } = models;

const comments = {
  async checkOwner(req, res, next) {
    const loggedUserId = req.user.payload.id;
    const id = parseInt(req.params.id, 10);

    const requester = await requests.findOne({ where: { id }, include: [{ model: users }] });
    if ((requester.userId === loggedUserId) || (requester.user.lineManager === loggedUserId)) {
      return next();
    }
    return responseError(res, 400, string.request.error.NOT_YOUR_REQUEST);
  },

  async checkExistingRequest(req, res, next) {
    const requestId = parseInt(req.params.id, 10);
    const request = await requests.findOne({
      where: { id: requestId }
    });
    if (request) {
      req.request = request;
      return next();
    }
    return responseError(res, 400, string.request.error.NO_REQUEST_REQUEST);
  }
};
export default comments;
