/* eslint-disable no-irregular-whitespace */
import Sequelize from 'sequelize';
import models from '../database/models';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';
import commentsHelper from '../helpers/commentsHelper';


export default class CommentsController {

  static async addComment(req, res) {
    const { comment } = req.body;
    const { id } = req.user.payload;
    const requestId = parseInt(req.params.id, 10);

    try {
      const newComment = { comment, userId: id, requestId };
      const addedComment = await models.comments.create(newComment);
      const {
        deleted, createdAt, updatedAt, userId,
        ...data
      } = addedComment.dataValues;

      return responseUtil(res, 200, strings.request.success.SUCCESS_ADD_COMMENT, data);
    } catch (error) {
      return res.status(500).json({ error: 'Something wrong' });
    }
  }

  static async getComments(req, res) {
    try {
      const requestId = parseInt(req.params.id, 10);
      const { Op } = Sequelize;
      const comments = await models.comments.findAll({
        attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] },
        include: [{ association: 'user', attributes: ['id', 'username', 'email'] }],
        where: {
          [Op.and]: [{ requestId },
            { deleted: false }]
        },
      });
      if (!comments.length) return responseUtil(res, 404, 'no comment exist');

      return responseUtil(res, 200, 'request comments', comments);

    } catch (error) {
      return res.status(500).json({ error: 'Something wrong' });
    }
  }

  static editComment(req, res) {
    const { id } = req.params;
    const { comment } = req.body;

    commentsHelper.findComment(req).then(async comments => {
      await commentsHelper.checkComment(
        req, comments, res, { comment }, id,
        strings.comments.success.COMMENT_UPDATED, comments
      );
    });
  }

  static deleteComment(req, res) {
    const { id } = req.params;

    commentsHelper.findComment(req).then(async comments => {
      await commentsHelper.checkComment(
        req, comments, res, { deleted: true }, id,
        strings.comments.success.COMMENT_DELETED, comments
      );
    });
  }
}
