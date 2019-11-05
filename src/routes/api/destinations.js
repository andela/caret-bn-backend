import { Router } from 'express';
import validateToken from '../../middlewares/auth/validateToken';
import checkRole from '../../middlewares/checkRole';
import destinationController from '../../controllers/destinationController';

const router = new Router();

router.use(validateToken, checkRole.supplierNotAllowed);

router.get('/most-visited', (req, res) => destinationController.viewTopDestinations(req, res));

export default router;
