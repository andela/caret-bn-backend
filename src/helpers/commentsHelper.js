import sequelize from 'sequelize';
import models from '../database/models';
import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';

const findComment = req => {
  const { Op } = sequelize;
  const { id } = req.params;
  const comment = models.comments.findOne({
    where: {
      [Op.and]: [{ id },
        { deleted: false }]
    },
  });
  return comment;
};

const checkComment = async (req, comments, res, data, id, message) => {
  const ownerId = req.user.payload.id;

  if (!comments) {
    return responseUtil(res, 404, strings.comments.error.COMMENT_NOT_FOUND);
  }
  if (comments.userId !== ownerId) {
    return responseUtil(res, 403, strings.comments.error.NOT_OWNER);
  }
  await models.comments.update(data, { where: { id, }, });
  const commentData = await models.comments.findOne({ where: { id, }, attributes: { exclude: ['userId', 'requestId', 'deleted', 'createdAt', 'updatedAt'] }, });
  return responseUtil(res, 200, message, commentData);
};

export default {
  findComment, checkComment
};
