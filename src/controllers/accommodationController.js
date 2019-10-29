/* eslint-disable radix */
import cloudinary from 'cloudinary';
import slugify from 'slugify';
import sequelize from 'sequelize';
import models from '../database/models';
import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import imageUploader from '../helpers/imageUploader';
import checkDate from '../helpers/checkDateHelper';
import bookingHelper from '../helpers/bookingHelper';

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

const {
  CREATED, NO_INFO_YET, RETRIEVED, NO_ACCOMMODATION, FOUND, BOOKED_FOUND
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
    } catch (error) { return responseError(res, 400, error); }
  }

  static async getAllAccommodations(req, res) {
    const { role, id: owner } = req.user.payload;
    if (role === 5) {
      const MyAccommodations = await models.accommodations.findAll({
        where: { owner },
        attributes: { exclude: ['locationId'] },
        include: [{
          model: models.locations, as: 'accommodationLocation', attributes: ['id', 'name']
        }]
      });

      return responseUtil(res, 200, (MyAccommodations.length === 0)
        ? NO_INFO_YET
        : RETRIEVED, MyAccommodations);
    }
    if (role === 1) {
      const allAccommodations = await models.accommodations.findAll({
        attributes: { exclude: ['locationId'] },
        include: [{
          model: models.locations, as: 'accommodationLocation', attributes: ['id', 'name']
        }]
      });

      return responseUtil(res, 200, (allAccommodations.length === 0)
        ? NO_ACCOMMODATION
        : RETRIEVED, allAccommodations);
    }
    return responseError(res, 403, strings.users.error.NO_ACCESS);
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

  static availableAccommdation(req, res) {
    const { Op } = sequelize;
    models.accommodations.findAll({
      where: {
        availableSpace: {
          [Op.gt]: 0,
        }
      },
      attributes: { exclude: ['locationId', 'owner'] },
      include: [{
        model: models.locations,
        as: 'accommodationLocation',
        attributes: ['id', 'name']
      }, {
        model: models.users,
        as: 'ownerUser',
        attributes: ['id', 'username', 'email']
      }]
    }).then(accommodation => responseUtil(res, 200, FOUND, accommodation));
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

}
