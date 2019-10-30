
/* eslint-disable no-irregular-whitespace */
import responseError from '../utils/responseError';
import string from '../utils/stringsUtil';
import models from '../database/models';
import requestHelper from '../helpers/requestHelper';

const { requests } = models;
const { findOneRequest } = requestHelper;

const request = {
  async selectPending(req, res, next) {
    const id = parseInt(req.params.id, 10);
    const reques = await findOneRequest({ id });

    if (reques.statusId !== 1) {
      return responseError(res, 400, string.users.error.NO_PENDED_REQUEST);
    }
    next();
  },

  async requestOwner(req, res, next) {
    const { id } = req.params;
    const request = await findOneRequest({ id });
    if (!request) {
      return responseError(res, 400, string.request.error.NO_REQUEST);
    }
    if (request.userId !== req.user.payload.id) {
      return responseError(res, 400, string.request.error.EDIT_YOUR_REQUEST);
    }
    req.request = request;
    next();
  },

  async validateBody(req, res, next) {
    const { id } = req.params;
    const destination = req.body;
    await requests.findOne({
      where: { id },
    });
    const destinationArray = destination.destinations;
    destinationArray.forEach(async element => {
      await models.destinations.findOne({
        where: {
          requestId: id, id: element.id
        },
      }).then(destination => {
        if (!destination) {
          return responseError(res, 403, `Destination of id ${element.id} does not belong to this request`);
        }
      });
    });
    next();
  }
};

export default request;
