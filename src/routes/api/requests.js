import { Router } from 'express';
import requestController from '../../controllers/requestController';
import validateToken from '../../middlewares/auth/validateToken';
import verifyRelationships from '../../middlewares/requests/relationVerification';

const router = new Router();

router.use(validateToken);

router.get('/', (req, res) => requestController.viewRequests(req, res));
router.get('/:id', (req, res) => requestController.findOne(req, res));
router.post('/', verifyRelationships, (req, res) => requestController.storeRequest(req, res));

export default router;
