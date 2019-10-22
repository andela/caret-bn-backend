import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import string from '../utils/stringsUtil';
import models from '../database/models';

const { users } = models;

export default class profile {
  static async updateProfile(req, res) {
    try {
      const newUser = await users.update(
        req.body,
        {
          where: { email: req.params.email },
          returning: true,
          plain: true
        }
      );
      const {
        password,
        createdAt,
        updatedAt,
        isVerified,
        ...data
      } = newUser[1].dataValues;
      return responseUtil(res, 200, string.users.success.SUCCESS_UPDATE, data);
    } catch (error) {
      return responseError(res, 500, string.users.error.SOMETHING_WRONG);
    }
  }

  static async getProfile(req, res) {
    try {
      const { email } = req.params;
      const user = await users.findOne({
        where: { email },
        raw: true
      });
      if (!user) {
        return res.status(404).json({
          error: 'user does not exist'
        });
      }
      const {
        password, isVerified, createdAt,
        updatedAt,
        ...data
      } = user;
      return res.status(200).json({
        message: 'User Profile',
        profile: data,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong',
      });
    }
  }
}
