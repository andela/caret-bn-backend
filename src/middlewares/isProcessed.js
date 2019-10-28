import strings from '../utils/stringsUtil';
import alreadyProcessed from '../helpers/alreadyProcessed';

const { RESQUEST_ALREADY_APPROVED, RESQUEST_ALREADY_REJECTED } = strings.requests;

const isProcessed = async (req, res, next) => {
  const approveRoute = (req.url.includes('approve'));
  const statusId = approveRoute ? 3 : 2;
  const message = approveRoute ? RESQUEST_ALREADY_APPROVED : RESQUEST_ALREADY_REJECTED;
  const { id } = req.params;

  await alreadyProcessed(res, id, statusId, message, next);
};

export default isProcessed;
