import models from '../database/models';

export default class AccommodationServices {
  static findOneAccommodation(property) {
    models.accommodations.findOne({
      where: property
    }).then(accommodation => accommodation);
  }

  static findAllAccommodations() {
    models.accommodations.findAll().then(accommodations => accommodations);
  }
}
