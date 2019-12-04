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
import EmailToken from '../utils/EmailToken';
import emailHelper from '../helpers/emailHelper';
import updateUser from '../helpers/updateUser';

dotenv.config();

const { users } = models;

const { FRONT_END_URL } = process.env;
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default class UserController {
  static signup(req, res) {
    const { username, email, password } = req.body;
    const APP_URL_BACKEND = `${req.protocol}://${req.headers.host}`;
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
        userId: user.id,
        username: user.username,
        email: user.email,
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
        return res.redirect(`${FRONT_END_URL}`);
      }
    } catch (error) {
      return responseUtil(res, 500, strings.users.error.SOMETHING_WRONG);
    }
  }

  static Providelink(req, res) {
    const { email, host } = req.body;
    models.users.findOne({
      where: {
        email,
      },
    }).then(user => {
      if (user == null) {
        return responseUtil(res, 404, strings.users.error.USER_NOT_FOUND);
      }
      const verifyToken = EmailToken.ResetToken(user);

      emailHelper.resetEmail(req, email, verifyToken, host);
      return responseUtil(res, 200, strings.users.success.SEND_EMAIL);
    });
  }

  static Changepassword(req, res) {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;
    const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

    models.users.findOne({ where: { email: decodedToken.payload.email, }, }).then(user => {
      if (user == null) {
        return responseUtil(res, 404, strings.users.error.USER_NOT_FOUND);
      }
      if (newPassword !== confirmPassword) {
        return responseUtil(res, 400, strings.users.error.PASSWORD_NOT_MATCH);
      }
      const compare = bcrypt.compareSync(req.body.newPassword, user.password);
      if (compare) {
        return responseUtil(res, 409, strings.users.error.PASSWORD_ALREADY_EXISTS);
      }
      models.users.update({

        password: hashPassword(req.body.newPassword),
      }, {
        where: {
          email: decodedToken.payload.email,
        },
      });
      return responseUtil(res, 200, strings.users.success.PASSWORD_CHANGED);
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

  static async switchNotif(req, res) {
    const { id } = req.user.payload;
    const { message, ObjectToUpdate, switchIsEmail } = req;
    const propertyToGet = switchIsEmail ? 'emailNotif' : 'appNotif';

    const user = await updateUser(ObjectToUpdate, id);

    const status = (user[1][0].dataValues[propertyToGet]) ? 'Activated' : 'Deactivated';
    return responseUtil(res, 200, `${message} Notifcation ${status}`);
  }

  static async logoutUser(req, res) {
    const { id } = req.user.payload;
    await updateUser({ logoutTime: new Date() }, id);
    return responseUtil(res, 200, strings.users.success.LOGOUT);
  }
}
