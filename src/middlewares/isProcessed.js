import strings from '../utils/stringsUtil';
import alreadyProcessed from '../helpers/alreadyProcessed';

const { APPROVED, REJECTED } = strings.requests;

const { RESQUEST_ALREADY_APPROVED, RESQUEST_ALREADY_REJECTED } = strings.requests;

const isProcessed = async (req, res, next) => {
  const { id } = req.params;
  const { statusId, actionIsApprove } = req;
  const message = actionIsApprove ? RESQUEST_ALREADY_APPROVED : RESQUEST_ALREADY_REJECTED;

  req.activity = actionIsApprove ? 'approved' : 'rejected';
  req.subject = actionIsApprove ? 'Request Approved' : 'Request Rejected';
  req.responseMessage = actionIsApprove ? APPROVED : REJECTED;

  await alreadyProcessed(res, id, statusId, message, next);
};

export default isProcessed;
