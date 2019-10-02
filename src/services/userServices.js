import database from '../database/models'

export default class UserServices {
    static async allUsers(){
        database.users.findAll()
            .then((users) => {
                return users;
            }).catch((err) => {
                throw err;
            });
    }
}
