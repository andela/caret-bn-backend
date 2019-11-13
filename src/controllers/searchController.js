import accommodationServices from '../services/accommodationServices';
import responseHelper from '../utils/responseHelper';
import searchQuery from '../utils/db/queries/accommodationSearchQuery';

export default class SearchController {
  static accommodations = async (req, res) => {

    const { query } = req;

    try {

      const accommodations = await accommodationServices.findAccommodations(searchQuery(query));

      if (accommodations.length === 0) {
        return responseHelper(res, 'No accommodations matching this criteria were found.', accommodations, 404);
      }

      return responseHelper(res, 'Accommodations', accommodations, 200);
    } catch (error) {
      return responseHelper(res, 'Something went wrong', error.message, 500);
    }
  }
}
