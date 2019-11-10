import sequelize from 'sequelize';
import models from '../database/models';

const bookingAssociations = [
  { association: 'status', attributes: ['id', 'name'] },
  { association: 'user', attributes: ['id', 'username', 'email'] },
  { association: 'accommodation', attributes: ['id', 'name', 'description', 'cost', 'currency', 'owner', 'images'] },
];

const availableAccommodation = req => {
  const { Op } = sequelize;
  const {
    accomodationId
  } = req.body;
  const item = models.accommodations.findAll({
    where: {
      id: accomodationId,
      availableSpace: {
        [Op.gt]: 0,
      }
    }
  });
  return item;
};

const findBooked = (req, id) => {
  const { Op } = sequelize;
  const bookings = models.booking.findAll({
    where: {
      [Op.and]: [{ accommodationId: id },
        { userId: req.user.payload.id }]
    },
  });
  return bookings;
};

const findAccomodation = req => {
  const { accomodationId } = req.body;
  const accommodation = models.accommodations.findOne({
    where: { id: accomodationId },
  });
  return accommodation;
};

const updateAccomodation = (req, remainingSpace) => {
  const { accomodationId } = req.body;
  const data = models.accommodations.update(
    { availableSpace: remainingSpace, },
    { where: { id: accomodationId, }, }
  );
  return data;
};

const findBookings = option => {
  const bookings = models.booking.findAll({
    where: option,
    attributes: { exclude: ['accommodationId', 'userId', 'statusId'] },
    include: bookingAssociations,
  });
  return bookings;
};

const filterOwner = (bookings, mybookings, supplierId) => {
  bookings.forEach(booking => {
    if (booking.accommodation.owner === supplierId) {
      mybookings.push(booking);
    }
  });
};

const findOneBooking = option => {
  const booking = models.booking.findOne({
    where: option,
  });
  return booking;
};

const findOneAccommodation = option => {
  const accommodation = models.accommodations.findOne({
    where: option,
  });
  return accommodation;
};

export default {
  availableAccommodation,
  findBooked,
  findAccomodation,
  updateAccomodation,
  findBookings,
  findOneBooking,
  findOneAccommodation,
  filterOwner,
  bookingAssociations,
};
