import { Router } from 'express';
import validateToken from '../../middlewares/auth/validateToken';
import { verifyPrivileges } from '../../middlewares/allDestinationMiddleware';
import destinationController from '../../controllers/destinationController';

const router = new Router();

router.use(validateToken, verifyPrivileges);

router.get('/top-locations', (req, res) => destinationController.viewTopDestinations(req, res));

export default router;
