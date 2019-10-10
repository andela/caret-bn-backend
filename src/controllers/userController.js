import bcrypt from 'bcrypt';
import models from '../database/models';
import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';
import hashPassword from '../utils/hashPassword';
import generateToken from '../utils/generateToken';

export default class UserController {
  static signup({ body: { username, email, password } }, res) {
    const user = models.users.build({
      username,
      email,
      password: hashPassword(password)
    });

    user.save().then(user => {
      const token = generateToken(user);

      return responseUtil(res, 201, strings.users.success.SIGNUP_SUCCESS, {
        user_id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.createdAt.toString(),
        updated_at: user.updatedAt.toString(),
        token,
      });
    });
  }

  static async signIn(req, res) {
    const { email, password } = req.body;
    const user = await models.users.findOne({ where: { email } });

    if (!user) {
      return responseError(res, 400, strings.users.error.LOGIN_FAILURE);
    }

    const match = bcrypt.compareSync(password, user.password);
    if (!match) {
      return responseError(res, 400, strings.users.error.LOGIN_FAILURE);
    }
    if (user.isVerified === false) {
      return responseError(res, 400, strings.users.error.VERIFY_FIRST);
    }
    const userToken = generateToken(user);
    const userInfo = {
      userID: user.id,
      username: user.username,
      email: user.email,
      token: userToken
    };
    return responseUtil(res, 200, strings.users.success.SUCCESSFUL_LOGIN, userInfo);
  }
}
