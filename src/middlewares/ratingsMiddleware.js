/* eslint-disable indent */
import validateRating from '../validation/validateRating';
import validationErrorFormatter from '../utils/validationErrorFormatter';
import { find } from '../services/bookingServices';
import { findRatingService } from '../services/ratingsServices';
import bookingQueries from '../utils/db/queries/bookingQueries';
import utilities from '../utils/index';

export const validateBody = (req, res, next) => {
    const { body } = req;
    const { error } = validateRating(body);
    if (error) {
        return validationErrorFormatter(res, error);
    }
    next();
};

export const checkIfBooked = async (req, res, next) => {
    const { user: { payload }, body } = req;

    const query = bookingQueries({
        userId: payload.id,
        accommodationId: body.accommodationId
    });

    const bookings = await find(query);

    if (bookings.length === 0) {
        return utilities.responseHelper(
            res,
            'You have not booked with this accomodation and therefore cannot rate it.',
            null,
            403
        );
    }
    req.bookings = bookings;
    next();
};

export const checkDateOfRating = (req, res, next) => {
    const { bookings } = req;
    const today = new Date();
    if (bookings[bookings.length - 1].checkIn > today) {
        return utilities.responseHelper(
            res,
            'You cannot rate a facility before you check in.',
            null,
            403
        );
    }
    next();
};

export const checkIfRated = async (req, res, next) => {
    const { body: { accommodationId }, user: { payload } } = req;
    const rating = await findRatingService({
        where: {
            userId: payload.id,
            accommodationId
        }
    });

    if (rating.length > 0) {
        return utilities.responseHelper(
            res,
            'You have already rated this facility.',
            null,
            409
        );
    }
    next();
};
