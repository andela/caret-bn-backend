import models from '../../database/models';
/* eslint-disable no-else-return */
/* eslint-disable  implicit-arrow-linebreak */
/* eslint-disable  no-async-promise-executor */

const checkMultiple = async destinations =>
  new Promise((resolve, reject) =>
    Promise.all(destinations.map(destination => {
      const bookingLength = destinations.filter(dest => dest.bookingId === destination.bookingId);
      if (bookingLength.length > 1) {
        return true;
      } else {
        return false;
      }
    })).then(res => {
      const resultCount = res.filter(result => result === true);
      if (resultCount.length === 0) {
        resolve({
          errorMessage: null
        });
      } else {
        reject(new Error(`You have ${resultCount.length} destinations with the same booking`));
      }
    }));


const checkOwnership = async (destinations, userId) =>
  new Promise(async (resolve, reject) => {

    const bookings = await models.booking.findAll({
      where: {
        userId
      }
    }).then(bookings => bookings);

    if (bookings.length === 0) {
      reject(new Error('You have no registered bookings'));
    } else {
      const mapping = destinations.map(destination => {
        const filter = bookings.filter(booking => booking.id === destination.bookingId);
        if (filter.length > 0) {
          return destination.bookingId;
        }
      });

      const mapped = mapping.filter(map => map !== undefined);

      if (mapped.length === destinations.length) {
        resolve();
      } else {
        reject(new Error('Please verify your booking.'));
      }
    }
  });

module.exports = {
  checkMultiple, checkOwnership
};
