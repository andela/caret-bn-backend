import { Router } from 'express';
import requestController from '../../controllers/requestController';
import validateToken from '../../middlewares/auth/validateToken';
import checkId from '../../middlewares/checkId';
import checkRole from '../../middlewares/checkRole';
import InputValidation from '../../middlewares/inputValidation';
import checkUserIdField from '../../middlewares/checkUserIdField';
import managerUserIdField from '../../middlewares/managerUserIdField';
import catchSearchQueries from '../../middlewares/catchSearchQueries';

const router = new Router();
const {
  viewMyRequests, approveRequest, rejectRequest, viewManagerRequests, searchRequests
} = requestController;

const { validateSearchRequestUser, validateSearchRequestManager } = InputValidation;
const { checkManagerRole, supplierNotAllowed } = checkRole;

router.get('/', validateToken, viewMyRequests);
router.get('/manager', validateToken, checkManagerRole, viewManagerRequests);
router.patch('/manager/approve/:id', validateToken, checkManagerRole, checkId, approveRequest);
router.patch('/manager/reject/:id', validateToken, checkManagerRole, checkId, rejectRequest);

/**
 * @swagger
 * /requests/search:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Requests
 *     name: Search Requests Route For All Users
 *     summary: Search Requests Route For All Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         schema:
 *          type: integer
 *          example: 3
 *       - name: destination
 *         in: query
 *         schema:
 *          type: integer
 *          example: 2
 *       - name: origin
 *         in: query
 *         schema:
 *          type: integer
 *          example: 2
 *       - name: duration
 *         in: query
 *         schema:
 *          type: integer
 *          example: 31
 *       - name: departureDate
 *         in: query
 *         schema:
 *          type: string
 *          example: 2019-10-25
 *       - name: statusId
 *         in: query
 *         schema:
 *          type: integer
 *          example: 2
 *       - name: reasons
 *         in: query
 *         schema:
 *          type: string
 *          example: business
 *     responses:
 *       '200':
 *         description: Requests Fetched successfully!
 *       '404':
 *         description: No Requests Registered!
*/
/**
 * @swagger
 * /requests/manager/search:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Requests
 *     name: Search Requests Route For Managers
 *     summary: Search Requests Route For Managers
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         schema:
 *          type: integer
 *          example: 3
 *       - name: userId
 *         in: query
 *         schema:
 *          type: integer
 *          example: 2
 *       - name: destination
 *         in: query
 *         schema:
 *          type: integer
 *          example: 2
 *       - name: origin
 *         in: query
 *         schema:
 *          type: integer
 *          example: 2
 *       - name: duration
 *         in: query
 *         schema:
 *          type: integer
 *          example: 31
 *       - name: departureDate
 *         in: query
 *         schema:
 *          type: string
 *          example: 2019-10-25
 *       - name: statusId
 *         in: query
 *         schema:
 *          type: integer
 *          example: 2
 *       - name: reasons
 *         in: query
 *         schema:
 *          type: string
 *          example: business
 *     responses:
 *       '200':
 *         description: Requests Fetched successfully!
 *       '404':
 *         description: No Requests Registered!
*/

router.get('/', validateToken, (req, res) => requestController.viewRequests(req, res));
router.get('/search', validateToken, catchSearchQueries, supplierNotAllowed, validateSearchRequestUser, checkUserIdField, searchRequests);
// eslint-disable-next-line max-len
router.get('/manager/search', validateToken, catchSearchQueries, supplierNotAllowed, checkManagerRole, validateSearchRequestManager, managerUserIdField, searchRequests);

export default router;
