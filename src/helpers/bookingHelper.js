import sequelize from 'sequelize';
import models from '../database/models';

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
export default {
  availableAccommodation, findBooked, findAccomodation, updateAccomodation
};
