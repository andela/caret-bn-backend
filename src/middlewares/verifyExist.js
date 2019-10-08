import strings from '../utils/stringsUtil';
import verifyExist from '../utils/verifyUserExist';

export default function verifyUserExist({ body: { username, email } }, res, next) {
  verifyExist(res, { username }, strings.users.error.USERNAME_ALREADY_EXISTS);
  verifyExist(res, { email }, strings.users.error.USER_ALREADY_EXISTS);
  return next();
}
