import models from '../../database/models';
import getAccommodation from '../../helpers/getAccommodation';

const { getOneAccommodation } = getAccommodation;

class LikeService {
  static async findLikes(accommodation, userId) {
    const like = await models.likes.findOne({
      where: { accommodationId: accommodation, userId }
    });
    if (!like) return null;
    return like.dataValues;
  }

  static async hasliked(slug, userId, status) {
    const accomodation = await models.accommodations.findOne({
      where: { slug }
    });
    const liked = await models.likes.findOne({
      where: { accommodationId: accomodation.id, userId, status }
    });
    // eslint-disable-next-line no-unneeded-ternary
    const newLiked = (liked) ? liked : {};
    newLiked.status = (liked !== null);
    return newLiked.status;
  }

  static async addNewLike(like) {
    const newLike = await models.likes.create(like);
    return newLike;
  }

  static async updateLike(accommodation, userId, status) {
    await models.likes.update(status, {
      where:
            { accommodationId: accommodation, userId }
    });
    return status;
  }

  static async likesSum(slug, id, status) {
    const accommodation = await getOneAccommodation({ slug }, id);
    const accommodationId = accommodation.id;
    const likes = await models.likes.count({ where: { accommodationId, status } });
    return likes;
  }
}
export default LikeService;
