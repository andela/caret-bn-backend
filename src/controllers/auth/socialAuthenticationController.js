/* eslint-disable no-underscore-dangle */
export default class SocialAuthController {
  static authenticateUser({ user }, res) {
    const clientUrl = `${process.env.FRONT_END_PATH}`;
    return res.redirect(`${clientUrl}/users/auth/success?user=${JSON.stringify(user.dataValues)}`);
  }
}
