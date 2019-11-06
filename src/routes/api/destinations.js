import { Router } from 'express';
import validateToken from '../../middlewares/auth/validateToken';
import checkRole from '../../middlewares/checkRole';
import destinationController from '../../controllers/destinationController';

/**
 * @swagger
 * /destinations/most-visted:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Destinations
 *     name: View Most Travelled
 *     summary: View most travelled destinations
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Top 5 visited destinations
*/
const router = new Router();

router.use(validateToken, checkRole.supplierNotAllowed);

router.get('/most-visited', (req, res) => destinationController.viewTopDestinations(req, res));

export default router;
