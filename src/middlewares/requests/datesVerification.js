
const verify = (res, destinations) => {

  destinations.forEach((destination, index) => {
    if (index !== 0) {
      if (destination.arrivalDate < destinations[index - 1].departureDate) {
        return res.status(400).json({
          status: 400,
          message: 'Arrival date must be after preceeding departure'
        });
      }

      if (destination.departureDate < destinations[index - 1].departureDate) {
        return res.status(400).json({
          status: 400,
          message: 'Departure Date Must not exceed preceeding departure date'
        });
      }
    }
  });
};

module.exports = {
  verify
};
