/* eslint-disable import/no-duplicates */
import JWT from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import dotenv from 'dotenv';
import models from '../database/models';
import responseUtil from './responseUtil';
import strings from './stringsUtil';

dotenv.config();

const ResetToken = user => {
  const token = JWT.sign(
    {
      payload: {
        id: user.id,
        send: true,
        email: user.email,
        expiration: moment()
          .add(1, 'hour')
          .unix(),
        iat: moment().unix(),
      },
    }, process.env.JWT_SECRET,
    {
      expiresIn: '1h',
    }
  );
  return token;
};
// Access token required for a user
const UseraccessRequired = (req, res, next) => {
  const { token } = req.params;
  const decodedToken = jwt.decode(token, process.env.JWT_SECRET);

  try {
    models.users.findOne({ where: { id: decodedToken.payload.id } })
      .then(user => {
        const now = moment().unix();
        if (now > decodedToken.payload.expiration) {
          return responseUtil(res, 400, strings.users.error.EXPERED);
        }
        if (!user || decodedToken.payload.send !== true) {
          return responseUtil(res, 403, strings.users.error.ANAUTHORIZED);
        }
      });
    next();
  } catch (error) {
    return responseUtil(res, 400, strings.token.INVALID_TOKEN);
  }

};

export default { ResetToken, UseraccessRequired };
