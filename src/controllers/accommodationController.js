/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable indent */
import cloudinary from 'cloudinary';
import slugify from 'slugify';
import models from '../database/models';
import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import imageUploader from '../helpers/imageUploader';
import checkDate from '../helpers/checkDateHelper';
import bookingHelper from '../helpers/bookingHelper';
import getAccommodation from '../helpers/getAccommodation';
import sendEmail from '../helpers/emailHelper';
import responseHelper from '../utils/responseHelper';
import notifSender from '../helpers/notifSender';
import likesServices from '../services/likesServices/likesServices';

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });


const { getOneAccommodation, getAllAccommodations } = getAccommodation;

const {
  CREATED,
  RETRIEVED,
  NO_ACCOMMODATION,
  BOOKED_FOUND,
  SINGLE_ACCOMMODATION,
  SINGLE_NOT_FOUND, NOT_FOUND,
  ACTIVATED,
  DEACTIVATED,
  DEACTIVATED_ACCOMMODATIONS,
  NO_BOOKING,
  FOUND_BOOKINGS,
  NO_RATED,
  HIGHEST_RATED,
} = strings.accommodation.success;

const {
  findLikes,
  addNewLike,
  updateLike,
} = likesServices;

export default class AccommodationController {
  static async createAccommodation(req, res) {
    const {
      name, description, locationId, availableSpace, cost, currency, highlights, amenities
    } = req.body;

    const images = await imageUploader(req, res);

    const accommodation = {
      name: name.toLowerCase(),
      description,
      locationId,
      availableSpace,
      cost,
      currency: currency.toUpperCase(),
      highlights,
      amenities,
      owner: req.user.payload.id,
      images,
      slug: slugify(name.toLowerCase())
    };
    try {
      const newAccommodation = await models.accommodations.create(accommodation);

      return responseUtil(res, 201, CREATED, newAccommodation);
    } catch (error) {
      if (error.sql) return responseError(res, 400, error.parent.detail);

      return responseError(res, 400, 'error');
    }
  }

  static async getAllAccommodations(req, res) {
    const { id } = req.user.payload;
    await getAllAccommodations({ isActivated: true }, id)
      .then(accommodations => responseUtil(res, 200, (accommodations.length === 0)
        ? NO_ACCOMMODATION : RETRIEVED, accommodations));
  }

  static async editAccommodation(req, res) {
    const { body, files } = req;

    if (Object.keys(body).length === 0) {
      return responseError(res, 400, 'There is nothing to update! Provide some information!');
    }

    let images;

    if (Object.keys(files).length > 0) {
      images = await imageUploader(req, res);
    }

    const editAccommodation = (images) ? { ...body, images } : { ...body };
    const { accommodation } = req;

    models.accommodations.update(editAccommodation, {
      where: {
        id: accommodation.id,
      },
      returning: true,
      plain: true
    }).then(updatedAccommodation => {
      updatedAccommodation[1].dataValues.owner = accommodation.ownerUser;
      responseUtil(
        res,
        200,
        strings.accommodations.success.ACCOMMODATION_UPDATED,
        updatedAccommodation[1].dataValues,
      );
    });
  }

  static deleteAccommodation(req, res) {
    const { accommodation } = req;
    models.accommodations.destroy({ where: { id: accommodation.id } }).then(() => {
      responseUtil(res, 200, strings.accommodations.success.ACCOMMODATION_DELETED);
    });
  }

  static viewBookings(req, res) {
    models.booking.findAll({
      where: {
        userId: req.user.payload.id
      },
      attributes: { exclude: ['accommodationId', 'userId', 'statusId'] },
      include: bookingHelper.bookingAssociations,
    }).then(book => responseUtil(res, 200, BOOKED_FOUND, book));
  }

  static bookAccommdation(req, res) {
    const {
      checkInDate, checkOutDate, accomodationId, roomsNumber
    } = req.body;

    const APP_URL_BACKEND = `${req.protocol}://${req.headers.host}`;

    bookingHelper.findAccomodation(req).then(bookings => {
      if (!bookings) {
        return responseUtil(res, 404, strings.accommodations.error.ACCOMMODATION_NOT_FOUND);
      }
      bookingHelper.availableAccommodation(req).then(accommodation => {
        if (accommodation.length === 0) {

          return responseUtil(res, 400, strings.accommodation.error.NOT_AVAILABLE);
        }

        checkDate(res, checkInDate, checkOutDate);
        const bookingData = {
          userId: req.user.payload.id,
          accommodationId: accomodationId,
          bookedSpace: roomsNumber,
          checkIn: checkInDate,
          checkOut: checkOutDate,
        };
        bookingHelper.findBooked(req, accommodation[0].id).then(async booked => {
          if (booked.length === 0) {

            if (accommodation[0].availableSpace < roomsNumber) {

              return responseUtil(res, 400, strings.accommodation.error.EXCEED_NUMBER);
            }
            const newBooking = await models.booking.create(bookingData);

            await notifSender(
              'Accommodation Booked',
              newBooking,
              accommodation[0].owner,
              APP_URL_BACKEND,
              'placed',
              'booking'
            );

            return responseUtil(res, 200, strings.accommodation.success.SUCCESSFUL_BOOKED);
          }
          return responseUtil(res, 409, strings.accommodation.error.ALREADY_BOOKED);
        });
      });
    });
  }

  static async viewSpecificAccommodation(req, res) {
    const { role, id } = req.user.payload;
    const { slug } = req.params;
    if (role === 2) {
      const accommodation = await getOneAccommodation({ slug }, id);

      return responseUtil(res, 200, (!accommodation)
        ? NOT_FOUND : SINGLE_ACCOMMODATION, accommodation);
    }
    const available = await getOneAccommodation({ slug, isActivated: true }, id);

    return responseUtil(res, 200, (!available)
      ? SINGLE_NOT_FOUND : SINGLE_ACCOMMODATION, available);
  }

  static async accommodationActivation(req, res) {
    const { role } = req.user.payload;
    const { slug } = req.params;
    const { reasons } = req.body;

    if (role === 2) {
      try {
        const accommodation = await getOneAccommodation({ slug });
        const { name, ownerUser } = accommodation;

        if (accommodation.isActivated === true) {
          models.accommodations.update({ isActivated: false }, { where: { slug } });

          sendEmail(ownerUser.email, 'Deactivated', name, reasons);

          return responseUtil(res, 200, DEACTIVATED);
        }
        await models.accommodations.update({ isActivated: true }, { where: { slug } });

        sendEmail(ownerUser.email, 'Activated', name, reasons);

        return responseUtil(res, 200, ACTIVATED);

      } catch (error) { return responseUtil(res, 200, NOT_FOUND); }
    }
    return responseUtil(res, 403, strings.users.error.TRAVEL_ADMINS_ONLY);
  }

  static async viewDeactivated(req, res) {
    const { role, id } = req.user.payload;

    if (role === 2) {
      const deactivatedAccommodations = await getAllAccommodations({ isActivated: false }, id);

      return responseUtil(res, 200, (!deactivatedAccommodations.length)
        ? NO_ACCOMMODATION : DEACTIVATED_ACCOMMODATIONS, deactivatedAccommodations);
    }
    return responseUtil(res, 403, strings.users.error.TRAVEL_ADMINS_ONLY);
  }

  static async searchBookings(req, res) {
    const bookings = await bookingHelper.findBookings(req.body);
    let myBookings = [];

    if (bookings.length) {
      bookingHelper.filterOwner(bookings, myBookings, req.user.payload.id);
    } else {
      myBookings = bookings;
    }

    return responseUtil(res, (!myBookings.length) ? 404 : 200, (!myBookings.length)
      ? NO_BOOKING : FOUND_BOOKINGS, myBookings.reverse());
  }

  static async changeStatus(req, res) {
    const { id } = req.params;
    const {
      statusId, activity, subject, responseMessage, actionIsApprove
    } = req;

    const bookingToProcess = await bookingHelper.findOneBooking({ id });
    const { accommodationId } = bookingToProcess;

    const accommodation = await bookingHelper.findOneAccommodation({ id: accommodationId });

    if (accommodation.owner !== req.user.payload.id) {
      return responseHelper(res, strings.accommodations.error.NOT_OWNER, null, 403);
    }

    const APP_URL_BACKEND = `${req.protocol}://${req.headers.host}`;

    if (bookingToProcess) {
      let booking = await models.booking.update({ statusId }, { where: { id }, returning: true, });

      booking = booking[1][0].dataValues;

      if (actionIsApprove) {
        const remainingSpace = accommodation.availableSpace - bookingToProcess.bookedSpace;
        req.body.accomodationId = accommodation.id;
        await bookingHelper.updateAccomodation(req, remainingSpace);
      }

      await notifSender(subject, booking, booking.userId, APP_URL_BACKEND, activity, 'booking');
      return responseHelper(res, responseMessage, null, 200);
    }
    return responseHelper(res, strings.accommodations.error.BOOKING_NOT_FOUND, null, 404);
  }

  static async viewOneBooking(req, res) {
    const { id } = req.params;
    const { role } = req.user.payload;
    models.booking.findOne({
      where: {
        id,
      },
      attributes: { exclude: ['accommodationId', 'userId', 'statusId'] },
      include: bookingHelper.bookingAssociations,
    }).then(booking => {
      if (!booking) {
        return responseUtil(res, 404, NO_BOOKING);
      }
      // eslint-disable-next-line max-len
      if ((role === 5 && booking.accommodation.owner !== req.user.payload.id) || (role !== 5 && booking.user.id !== req.user.payload.id)) {
        return responseUtil(res, 404, NO_BOOKING);
      }

      return responseUtil(res, 200, BOOKED_FOUND, booking);
    });

  }

  static async likeAccommodation(req, res) {
    const { slug, like } = req.params;
    const loggedId = req.user.payload.id;
    const accommodation = await getOneAccommodation({ slug, isActivated: true }, loggedId);
    if (!accommodation) { return responseUtil(res, 404, NOT_FOUND); }
    const { id } = accommodation;
    const likes = await findLikes(id, req.user.payload.id);

    if (!likes && like === 'like') {
      const newlike = { userId: req.user.payload.id, accommodationId: id, status: true };
      addNewLike(newlike).then(() => responseUtil(res, 201, strings.likes.success.LIKED, newlike));
    }

    if (!likes && like === 'unlike') {
      const newDislike = { userId: req.user.payload.id, accommodationId: id, status: false };
      // eslint-disable-next-line max-len
      addNewLike(newDislike).then(() => responseUtil(res, 201, strings.likes.success.DISLIKE, newDislike));
    }
    const updateLikeHelper = async (res, likes, like, status, action, message, id, loggedId) => {
      if (likes.status === status && like === action) {
        await updateLike(id, loggedId, { status: !status });
        return responseUtil(res, 200, message);
      }
    };

    if ((likes.status === true && like === 'like') || (likes.status === false && like === 'unlike')) {
      return responseUtil(res, 400, `You already ${like}d this before`);
    }

    await updateLikeHelper(res, likes, like, false, 'like', strings.likes.success.LIKED, id, req.user.payload.id);
    await updateLikeHelper(res, likes, like, true, 'unlike', strings.likes.success.DISLIKE, id, req.user.payload.id);
  }

  static async viewTopRated(req, res) {
    const accommodations = await getAllAccommodations();
    const values = [];

    accommodations.forEach(accommodation => {
      if (!isNaN(accommodation.dataValues.averageRating)) {
        values.push(accommodation.dataValues);
      }
    });
    const sorted = values.sort((low, high) => high.averageRating - low.averageRating).slice(0, 5);

    return responseUtil(res, (!sorted.length) ? 404 : 200, (!sorted.length)
      ? NO_RATED : HIGHEST_RATED, sorted);

  }
}
