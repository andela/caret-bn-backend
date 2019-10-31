import Router from 'express';
import ratingsController from '../../controllers/ratingsController';
import validateToken from '../../middlewares/auth/validateToken';
import {
  checkIfBooked,
  checkDateOfRating,
  validateBody,
  checkIfRated
} from '../../middlewares/ratingsMiddleware';

const router = new Router();
router.use(validateToken);

router.get('/:slug', (req, res) => ratingsController.viewRating(req, res));
router.post(
  '/',
  validateBody,
  checkIfBooked,
  checkDateOfRating,
  checkIfRated,
  (req, res) => ratingsController.storeRating(req, res)
);

export default router;
