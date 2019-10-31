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
} = strings.accommodation.success;

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
      attributes: { exclude: ['accommodationId', 'userId'] },
      include: [{ association: 'accommodation', attributes: ['id', 'name', 'description', 'cost', 'currency', 'owner', 'images'] },
      { association: 'user', attributes: ['id', 'username', 'email'] }],
    }).then(book => responseUtil(res, 200, BOOKED_FOUND, book));
  }

  static bookAccommdation(req, res) {
    const {
      checkInDate, checkOutDate, accomodationId, roomsNumber
    } = req.body;

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
        bookingHelper.findBooked(req, accommodation[0].id).then(booked => {
          if (booked.length === 0) {

            if (accommodation[0].availableSpace < roomsNumber) {

              return responseUtil(res, 400, strings.accommodation.error.EXCEED_NUMBER);
            }
            models.booking.create(bookingData);

            const remainingSpace = parseInt(accommodation[0].availableSpace) - roomsNumber;

            bookingHelper.updateAccomodation(req, remainingSpace);

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
}
