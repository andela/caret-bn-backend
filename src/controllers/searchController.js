/* eslint-disable max-len */
/* eslint-disable eqeqeq */
import accommodationServices from '../services/accommodationServices';
import responseHelper from '../utils/responseHelper';
import searchQuery from '../utils/db/queries/accommodationSearchQuery';
import { getRatings } from '../helpers/ratingsHelper';

export default class SearchController {

  static accommodations = async (req, res) => {

    const applyRatings = async (accommodations, userId) => (
      Promise.all(accommodations.map(async accommodation => {
        const rated = await getRatings(accommodation, userId);
        return rated;
      }))
    );

    const { query, user: { payload: { id } } } = req;

    try {

      const unrated = await accommodationServices.findAccommodations(searchQuery(query));

      let accommodations = await applyRatings(unrated, id);

      if (query.rating) {
        accommodations = accommodations.filter(accommodation => {
          const nearestInt = Math.round(accommodation.dataValues.averageRating);
          return nearestInt == query.rating;
        });
      }

      if (accommodations.length === 0) {
        return responseHelper(res, 'No accommodations matching this criteria were found.', accommodations, 404);
      }

      return responseHelper(res, 'Accommodations', accommodations, 200);
    } catch (error) {
      return responseHelper(res, 'Something went wrong', error.message, 500);
    }
  }
}
