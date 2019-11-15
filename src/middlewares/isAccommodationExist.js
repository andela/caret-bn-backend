import models from '../database/models';
import responseError from '../utils/responseError';

const isAccommodationExist = {
  async accommodationExist(req, res, next) {
    const { id, slug } = req.params;
    let idAccommodation;
    let condition;
    if (!id) {
      condition = slug;
      idAccommodation = await models.accommodations.findOne({
        where: { slug }
      });
    } else {
      condition = id;
      idAccommodation = await models.accommodations.findOne({
        where: { id }
      });
    }

    if (!idAccommodation) {
      return responseError(
        res,
        404,
        `Accommodation ${condition} does not exist`
      );
    }
    return next();
  }
};

export default isAccommodationExist;
