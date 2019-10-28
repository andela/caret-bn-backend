/* eslint-disable no-irregular-whitespace */
import responseError from '../utils/responseError';
import string from '../utils/stringsUtil';
import models from '../database/models';

const { requests } = models;

const request = {
  async selectPending(req, res, next) {
    const userId = req.user.payload.id;
    const id = parseInt(req.params.id, 10);
    const requester = await requests.findOne({
      where: { id, userId },
      raw: true
    });
    if (requester.statusId !== 1) {
      return responseError(res, 400, string.users.error.NO_PENDED_REQUEST);
    }
    next();
  },

  async requestOwner(req, res, next) {
    const { id } = req.params;
    const request = await requests.findOne({
      where: { id },
    });
    if (!request) {
      return responseError(res, 400, 'string.request.error.EDIT_YOUR_REQUEST');
    }
    if (request.userId !== req.user.payload.id) {
      return responseError(res, 400, string.request.error.EDIT_YOUR_REQUEST);
    }
    req.request = request;
    next();
  }
};

export default request;
