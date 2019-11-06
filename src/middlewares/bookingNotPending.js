import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';

const { BOOKING_APPROVED, BOOKING_REJECTED } = strings.accommodations.success;

const bookingNotPending = async (req, res, next) => {
  const { actionIsApprove, booking } = req;

  if (booking.statusId !== 1) {
    return responseError(res, 403, 'This booking is not pending. You cannot edit its status');
  }

  req.activity = actionIsApprove ? 'approved' : 'rejected';
  req.subject = actionIsApprove ? 'Booking Approved' : 'Booking Rejected';
  req.responseMessage = actionIsApprove ? BOOKING_APPROVED : BOOKING_REJECTED;

  return next();
};

export default bookingNotPending;
