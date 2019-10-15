import { Router } from 'express';
import requestController from '../../controllers/requestController';
import validateToken from '../../middlewares/auth/validateToken';

const router = new Router();


router.get('/', validateToken, (req, res) => requestController.viewRequests(req, res));

export default router;
