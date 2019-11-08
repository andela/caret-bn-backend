import moment from 'moment';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';

const checkDate = (res, startDate, endDate) => {

  if (moment(startDate) < moment.now() || moment(endDate) < moment.now()) {
    responseUtil(res, 400, strings.accommodation.error.INVALID_DATE);
  }
  if (moment(endDate) < moment(startDate)) {
    responseUtil(res, 400, strings.accommodation.error.DATE_ERROR);
  }
};


export default checkDate;
