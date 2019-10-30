import { Router } from 'express';
import requestController from '../../controllers/requestController';
import validateToken from '../../middlewares/auth/validateToken';
import verifyRelationships from '../../middlewares/requests/relationVerification';
import checkId from '../../middlewares/checkId';
import checkRole from '../../middlewares/checkRole';
import InputValidation from '../../middlewares/inputValidation';
import checkUserIdField from '../../middlewares/checkUserIdField';
import managerUserIdField from '../../middlewares/managerUserIdField';
import catchSearchQueries from '../../middlewares/catchSearchQueries';
import isProcessed from '../../middlewares/isProcessed';
import wrongAction from '../../middlewares/wrongAction';

const router = new Router();
const {
  viewMyRequests, changeStatus, viewManagerRequests, searchRequests
} = requestController;

const { validateSearchRequestUser, validateSearchRequestManager } = InputValidation;
const { checkManagerRole, supplierNotAllowed } = checkRole;

router.get('/', validateToken, viewMyRequests);
router.get('/manager', validateToken, checkManagerRole, viewManagerRequests);
router.patch('/manager/:action/:id', validateToken, checkManagerRole, checkId, wrongAction, isProcessed, changeStatus);

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

router.use(validateToken);

router.post('/', verifyRelationships, (req, res) => requestController.storeRequest(req, res));
router.get('/', validateToken, (req, res) => requestController.viewRequests(req, res));
router.get('/search', validateToken, catchSearchQueries, supplierNotAllowed, validateSearchRequestUser, checkUserIdField, searchRequests);
// eslint-disable-next-line max-len
router.get('/manager/search', validateToken, catchSearchQueries, supplierNotAllowed, checkManagerRole, validateSearchRequestManager, managerUserIdField, searchRequests);
router.get('/:id', (req, res) => requestController.findOne(req, res));

export default router;
