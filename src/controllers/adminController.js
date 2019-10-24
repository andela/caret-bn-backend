import models from '../database/models';
import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';

export default class AdminController {
  // get all users
  static GetAllUsers(req, res) {
    models.users.findAll({
      attributes: { exclude: ['password', 'role'] },
      include: [{ association: 'Role', attributes: ['id', 'name', 'abbr'] }]
    }).then(users => responseUtil(res, 200, strings.users.success.ALL, users));
  }

  // get one user
  static GetOneUsers(req, res) {
    const { id } = req.params;

    models.users.findOne({
      attributes: { exclude: ['password', 'role'] },
      include: [{ association: 'Role', attributes: ['id', 'name', 'abbr'] }],
      where: { id, },
    }).then(user => {
      if (!user) {
        return responseUtil(res, 404, strings.users.error.USER_NOT_FOUND);
      }
      return responseUtil(res, 200, strings.users.success.USER_FOUND, user);
    });
  }

  // get all roles
  static GetRoles(req, res) {
    models.Role.findAll().then(roles => responseUtil(res, 200, strings.users.success.FOUND, roles));
  }

  // assign roles to user
  static AssignRoles(req, res) {
    const { Role } = req.body;
    const { id } = req.params;
    models.users.findOne({ where: { id }, }).then(user => {

      if (!user) {
        return responseUtil(res, 404, strings.users.error.USER_NOT_FOUND);
      }
      models.Role.findOne({ where: { name: Role }, }).then(role => {
        if (user.role === role.id) {
          return responseUtil(res, 409, strings.users.error.ROLE_ALREADY_EXISTS);
        }
        models.users.update({ role: role.id, }, { where: { id, }, });
        return responseUtil(res, 200, strings.users.success.SUCCESSFUL_ASSIGN);
      });
    });
  }
}
