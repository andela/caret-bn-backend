/* eslint-disable no-else-return */
/* eslint-disable  implicit-arrow-linebreak */

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

module.exports = {
  checkMultiple
};
