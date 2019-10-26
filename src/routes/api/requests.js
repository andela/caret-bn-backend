import { Router } from 'express';
import requestController from '../../controllers/requestController';
import validateToken from '../../middlewares/auth/validateToken';
import checkId from '../../middlewares/checkId';
import checkRole from '../../middlewares/checkRole';

const router = new Router();
const {
  viewMyRequests, approveRequest, rejectRequest, viewManagerRequests
} = requestController;

const { checkManagerRole } = checkRole;

router.get('/', validateToken, viewMyRequests);
router.get('/manager', validateToken, checkManagerRole, viewManagerRequests);
router.patch('/manager/approve/:id', validateToken, checkManagerRole, checkId, approveRequest);
router.patch('/manager/reject/:id', validateToken, checkManagerRole, checkId, rejectRequest);

export default router;
