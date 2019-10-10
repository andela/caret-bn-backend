import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';
import bcrypt from 'bcrypt';
import models from '../database/models';
import responseUtil from '../utils/responseUtil';
import responseError from '../utils/responseError';
import strings from '../utils/stringsUtil';
import hashPassword from '../utils/hashPassword';
import generateToken from '../utils/generateToken';

const { users } = models;

dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const { APP_URL_BACKEND } = process.env;

export default class UserController {
  static signup({ body: { username, email, password } }, res) {
    const user = models.users.build({
      username,
      email,
      password: hashPassword(password)
    });

    user.save().then(user => {
      const token = generateToken(user);
      const msg = {
        to: email,
        from: 'BarefootNomad@gmail.com',
        subject: 'Account Verification',
        html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
          <h1 style="color: #848484;">Barefoot Nomad</h1>
          <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Welcome ${username},<br> We are happy to be with you. Please verify your mail .<br> Click the button below to verify your new account.</p>
          <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${APP_URL_BACKEND}/api/v1/users/verify/${token}">Verify Account</a>
          </a></p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our system!</p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Barefoot Nomad Caret Team</p>
          </div>`
      };
      sgMail.send(msg);

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

  static async userVerify({ params: { token } }, res) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    try {
      const user = await users.findOne({ where: { id: decodedToken.payload.id } });
      if (!user) {
        return responseUtil(res, 404, strings.users.error.USE_NOT_REGISTERED);
      }
      const updatedUser = await users.update(
        { isVerified: true },
        { where: { id: decodedToken.payload.id } }
      );

      if (updatedUser) {
        return responseUtil(res, 200, strings.users.success.SUCCESS_VERIFIED);
      }
    } catch (error) {
      return responseUtil(res, 500, strings.users.error.SOMETHING_WRONG);
    }
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
