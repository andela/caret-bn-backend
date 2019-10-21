
const verify = (res, destinations) => {
  destinations.forEach(destination => {
    const bookingLength = destinations.filter(dest => dest.bookingId === destination.bookingId);
    if (bookingLength.length > 1) {
      return res.status(400).json({
        status: 400,
        message: 'You cannot use the same booking in multiple destinations.'
      });
    }
  });
};


module.exports = {
  verify
};
