import models from '../../database/models';
import serviceHelper from '../serviceHelpers/requestServiceHelper';

const findOne = (query, scope = null) => models.requests.scope(scope)
  .findOne(query).then(request => serviceHelper.deleteRequestKeys(request));

const createRequest = async ({ typeId, locationId }, userId) => {
  const request = await models.requests.create({
    typeId,
    locationId,
    userId,
    statusId: 1
  });

  return request;
};

module.exports = {
  createRequest, findOne
};
