import strings from '../utils/stringsUtil';
import verifyExist from '../utils/verifyUserExist';

const verifyUserExist = ({ body: { username, email } }, res, next) => {
  verifyExist(res, { username }, strings.users.error.USERNAME_ALREADY_EXISTS);
  verifyExist(res, { email }, strings.users.error.USER_ALREADY_EXISTS);
  return next();
};

export default verifyUserExist;
