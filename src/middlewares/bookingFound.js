import bookingHelper from '../helpers/bookingHelper';
import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const bookingFound = async (req, res, next) => {
  const { id } = req.params;
  const booking = await bookingHelper.findOneBooking({ id });

  if (!booking) {
    return responseError(res, 404, strings.accommodations.error.BOOKING_NOT_FOUND);
  }

  req.booking = booking;
  return next();
};

export default bookingFound;
