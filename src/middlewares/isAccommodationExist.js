import models from '../database/models';
import responseError from '../utils/responseError';

const isAccommodationExist = {
  async accommodationExist(req, res, next) {
    const { slug } = req.params;
    const idAccommodation = await models.accommodations.findOne({
      where: { slug }
    });

    if (!idAccommodation) {
      return responseError(res, 404, `Accommodation ${slug} does not exist`);
    }
    return next();
  },

  checkAction(req, res, next) {
    const { like } = req.params;
    if (!(like === 'like' || like === 'unlike')) {
      return responseError(res, 404, `Action '${like}' does not exist! Use 'like' or 'unlike'.`);
    }
    return next();
  }
};

export default isAccommodationExist;
