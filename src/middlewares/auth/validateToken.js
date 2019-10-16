import jwt from 'jsonwebtoken';
import Utilities from '../../utils/index';

export default (req, res, next) => {
  const header = req.headers.authorization;
  if (typeof header === 'undefined') return Utilities.responseHelper(res, Utilities.stringsHelper.auth.token.SIGN_IN_FIRST, null, 401);

  const bearer = header.split(' ');
  const token = bearer[1];

  try {
    const verifiedUser = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifiedUser;
    return next();
  } catch (error) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.auth.token.UNABLE_TO_PROCESS,
      null,
      400
    );
  }
};
