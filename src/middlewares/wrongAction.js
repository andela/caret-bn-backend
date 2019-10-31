import responseError from '../utils/responseError';

const wrongAction = (req, res, next) => {
  const { action } = req.params;
  if ((action !== 'approve') && (action !== 'reject')) {
    return responseError(res, 400, `Ooops! Cannot do action '${action}' on a request`);
  }

  const actionIsApprove = (action.includes('approve'));
  req.statusId = actionIsApprove ? 3 : 2;
  req.actionIsApprove = actionIsApprove;

  return next();
};

export default wrongAction;
