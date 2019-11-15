import models from '../../database/models';

class LikeService {
  static async findLikes(accommodation, userId) {
    const like = await models.likes.findOne({
      where: { accommodationId: accommodation, userId }
    });
    if (!like) return null;
    return like.dataValues;
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
}
export default LikeService;
