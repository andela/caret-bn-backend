import requestsSearch from '../utils/requestsSearch';
import findUser from '../helpers/findUser';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/strings';

const managerViewRequest = async (req, res, next) => {
  const { role } = req.user.payload;
  const { id } = req.params;
  let requesterId;
  const request = await requestsSearch({ id });
  let user;

  if (!request.length || !request) {
    return responseUtil(res, 404, strings.user.requests.NO_REQUESTS);
  }

  switch (role) {
  case 4:
    requesterId = request[0].dataValues.requester.id;
    user = await findUser({ id: requesterId });
    if (user.lineManager !== req.user.payload.id) {
      return responseUtil(res, 403, strings.user.requests.NOT_MANAGER);
    }
    break;
  case 6:
    requesterId = req.user.payload.id;
    break;
  }
  req.requesterId = requesterId;
  return next();
};

export default managerViewRequest;
