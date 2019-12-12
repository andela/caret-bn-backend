import Router from 'express';
import locationsController from '../../controllers/locationsController';
import validateToken from '../../middlewares/auth/validateToken';

const router = new Router();

router.use(validateToken);

router.get('/', (req, res) => locationsController.viewLocations(req, res));

export default router;
