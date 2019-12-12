/* eslint-disable indent */
/* eslint-disable max-len */
import { getLocations } from '../services/locationServices';
import utilities from '../utils/index';

export default class LocationsController {

    static async viewLocations(req, res) {
        const locations = await getLocations();
        return utilities.responseHelper(
            res,
            'locations',
            locations,
            200
        );
    }

}
