import express from 'express';
import AdminController from '../../controllers/adminController';
import permissions from '../../middlewares/permissions';
import InputValidation from '../../middlewares/inputValidation';
import validateToken from '../../middlewares/auth/validateToken';
import checkId from '../../middlewares/checkId';

const {
  GetAllUsers, GetOneUsers, GetRoles, AssignRoles
} = AdminController;
const { AdminAccess } = permissions;
const { validateRole } = InputValidation;
const router = express.Router();

router.get('/users/', validateToken, AdminAccess, GetAllUsers);
router.get('/users/:id', validateToken, AdminAccess, checkId, GetOneUsers);
router.get('/roles/', validateToken, AdminAccess, GetRoles);
router.patch('/roles/assign/:id', validateToken, AdminAccess, checkId, validateRole, AssignRoles);

export default router;
