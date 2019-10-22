import requestsSearch from '../utils/requestsSearch';

export default class SearchRequestsQueries {
  static async allSearch(options) {
    return requestsSearch(options);
  }
}
