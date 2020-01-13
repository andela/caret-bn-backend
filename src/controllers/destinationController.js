/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
/* eslint-disable function-paren-newline */
/* eslint-disable require-jsdoc */
import destinationServices from '../services/requestServices/destinationServices';
import { findOne, allRequests } from '../services/requestServices/requestServices';
import { allDestinations } from '../utils/db/queries/destinationQueries';
import Utilities from '../utils/index';
import notifSender from '../helpers/notifSender';
import arrayMapper from '../helpers/arrayMapper';

export default class destinationController {
  static async storeDestination(req, res, body, user, request) {
    const { destinations, host } = body;
    const APP_URL_BACKEND = `${req.protocol}://${req.headers.host}`;

    await Promise.all(destinations.map(async destination => {
      await destinationServices.createDestination(destination, request.id);
    }));

    const query = Utilities.requestQueries.singleRequest(request.id, user.payload.id);

    const response = await findOne(query);

    const { lineManager } = user.payload;

    await notifSender(req, 'Request Created', request, lineManager, APP_URL_BACKEND, 'created', 'request', host);

    return Utilities.responseHelper(
      res,
      'Successfully Placed Request',
      response,
      201
    );
  }

  static async viewTopDestinations(req, res) {
    const approvedTravelRequests = await allRequests(allDestinations);
    const destinations = await Promise.all(approvedTravelRequests.map(async request => {
      const destination = await request.destinations;
      return destination;
    }));

    const locations = await Promise.all(destinations.map(async destination => destination.map(dest => ({
      locationId: dest.locationId,
      name: dest.location.name,
      country: dest.location.country,
      images: dest.location.images
    }))));

    const spread = [];
    locations.forEach(location => spread.push(...location));

    const filteredLocationArray = spread.map(local => ({
      id: local.locationId,
      name: local.name,
      country: local.country,
      images: local.images,
      numberOfVisits: spread.filter(
        location => (location.locationId === local.locationId)
      ).length
    }));

    const singleLocations = arrayMapper(filteredLocationArray);

    return Utilities.responseHelper(
      res,
      'Top 5 locations',
      singleLocations.sort((first, second) => second.numberOfVisits - first.numberOfVisits).slice(0, 5),
      200
    );
  }
}
