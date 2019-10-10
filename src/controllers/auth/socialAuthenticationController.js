import Utilities from '../../utils/index';

export default class SocialAuthController {
  static authenticateUser({ user }, res) {
    return Utilities.responseHelper(
      res,
      Utilities.stringsHelper.auth.social.SUCCESSFULLY_AUTHENTICATED,
      user,
      200
    );
  }
}
