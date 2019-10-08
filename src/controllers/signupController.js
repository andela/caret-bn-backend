import models from '../database/models';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';
import hashPassword from '../utils/hashPassword';
import generateToken from '../utils/generateToken';


export default class SignupController {
  static async signupController({ body: { username, email, password } }, res) {
    const user = models.users.build({
      username,
      email,
      password: hashPassword(password)
    });

    user.save().then(user => {
      const token = generateToken(user);

      return responseUtil(res, 200, strings.users.success.SIGNUP_SUCCESS, {
        user_id: user.id,
        username: user.username,
        email: user.email,
        created_at: user.createdAt.toString(),
        updated_at: user.updatedAt.toString(),
        token,
      });
    });
  }
}
