import models from '../database/models';

export default class AccommodationServices {
  static findOneAccommodation(property) {
    return models.accommodations.findOne({
      where: property
    }).then(accommodation => accommodation);
  }

  static findAccommodations(query) {
    return models.accommodations.findAll(query).then(accommodations => accommodations);
  }
}
