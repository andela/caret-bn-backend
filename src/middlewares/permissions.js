import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../database/models';
import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';

dotenv.config();
// Admin token required for a user
const AdminAccess = (req, res, next) => {
  const token = req.headers.authorization;
  const Token = token.split(' ')[1];
  const decodedToken = jwt.decode(Token, process.env.SECRET_KEY);

  models.Role.findOne({ where: { id: decodedToken.payload.role } })
    .then(role => {
      if (role.abbr !== 'SA') {
        return responseUtil(res, 403, strings.users.error.ANAUTHORIZED);
      }
    });

  next();
};
export default { AdminAccess };
