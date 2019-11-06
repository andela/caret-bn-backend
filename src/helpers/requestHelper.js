import sequelize from 'sequelize';
import models from '../database/models';
import dateValidator from './datesValidator';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';

const findOneRequest = properties => {
  const request = models.requests.findOne({
    where: properties,
    raw: true
  });
  return request;
};

const findStatRequest = async (req, res) => {
  const { startDate, endDate } = req.query;
  const { Op } = sequelize;
  const checkDate = dateValidator(startDate, endDate);
  if (checkDate === true) {
    responseUtil(res, 400, strings.request.error.DATE_ERROR);
  }
  const requestResult = await models.requests.findAndCountAll({
    where: {
      userId: req.user.payload.id,
      statusId: 3,
      departureDate: {
        [Op.between]: [startDate, endDate],
      }
    }
  });
  return requestResult;
};

export default { findOneRequest, findStatRequest };
