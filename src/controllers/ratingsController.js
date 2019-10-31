/* eslint-disable indent */
/* eslint-disable max-len */
import { storeRatingService } from '../services/ratingsServices';
import accomodationServices from '../services/accommodationServices';
import utilities from '../utils/index';
import { getRatings } from '../helpers/ratingsHelper';

export default class FeebackController {

    static async viewRating(req, res) {

        const { slug } = req.params;
        const { id } = req.user.payload;
        const accomodation = await accomodationServices.findOneAccommodation({
            slug
        });

        if (!accomodation) {
            return utilities.responseHelper(
                res,
                'accomodation does not exist',
                null,
                404
            );
        }

        const ratedAccomopdation = await getRatings(accomodation, id);

        const message = `${accomodation.name}'s current ratings`;

        const { ratings } = ratedAccomopdation.dataValues;

        return utilities.responseHelper(
            res,
            (ratings.length > 0 ? message : 'No ratings available'),
            (ratings.length > 0 ? ratedAccomopdation : 'No average available'),
            (ratings.length > 0 ? 200 : 404)
        );
    }

    static async storeRating(req, res) {
        const { user: { payload: { id } }, body } = req;
        try {
            const rating = await storeRatingService(body, id);
            return utilities.responseHelper(
                res,
                'Successfully rated facility',
                rating,
                201
            );
        } catch (error) {
            return utilities.responseHelper(
                res,
                `Something went wrong during storage: ${error}`,
                null,
                500
            );
        }
    }

}
