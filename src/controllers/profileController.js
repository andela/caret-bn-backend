import cloudinary from 'cloudinary';
import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import string from '../utils/stringsUtil';
import models from '../database/models';

cloudinary.config({ CLOUDINARY_URL: process.env.CLOUDINARY_URL });

const { users } = models;

export default class profile {
  static async updateProfile(req, res) {
    try {
      const {
        role, email, password, ...updateData
      } = {
        ...req.body, image: req.imgLink,
      };

      await users.update(updateData, {
        where: { email: req.params.email },
        returning: true,
        plain: true
      });
      return responseUtil(res, 200, string.users.success.SUCCESS_UPDATE, updateData);
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
        password, isVerified, createdAt, updatedAt, ...data
      } = user;
      return res.status(200).json({
        message: 'User Profile',
        profile: data
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Something wrong'
      });
    }
  }
}
