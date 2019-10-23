
const checkMultiple = destinations => {
  for (let counter = 0; counter < destinations.length; counter += 1) {
    /*  eslint-disable-next-line max-len */
    const bookingLength = destinations.filter(dest => dest.bookingId === destinations[counter].bookingId);
    if (bookingLength.length > 1) {
      return true;
    }
  }
  return false;
};


module.exports = {
  checkMultiple
};
