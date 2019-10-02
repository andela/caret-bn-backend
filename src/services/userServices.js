import database from '../database/models';

export default class UserServices {
  static async allUsers() {
    database.users.findAll()
      .then((users) => users).catch((err) => {
        throw err;
      });
  }
}
