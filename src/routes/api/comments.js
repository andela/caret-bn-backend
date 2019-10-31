import { Router } from 'express';
import commentsController from '../../controllers/commentsController';
import validateToken from '../../middlewares/auth/validateToken';
import InputValidation from '../../middlewares/inputValidation';
import comments from '../../middlewares/commentMiddleware';

const router = new Router();
const { addComment, getComments } = commentsController;
const { validateComment } = InputValidation;
const { checkExistingRequest, checkOwner } = comments;

/**
 * @swagger
 * definitions:
 *   createComments:
 *     type: object
 *     properties:
 *       name:
 *         comment: string
 *         example: hey
 */
/**
 * @swagger
 * /comments/{id}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Comments
 *     name: Create a Comment
 *     summary: Create a Comment
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *          $ref: '#/definitions/createComments'
 *       - name: id
 *         in: path
 *         schema:
 *          type: integer
 *     responses:
 *       '201':
 *         description: New comment added successfully!
*/
/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Comments
 *     name: Get all comments
 *     summary: Get all comments
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         schema:
 *          type: integer
 *     responses:
 *       '200':
 *         description: Comments retrieved successfully!!
*/

router.post('/:id', validateToken, validateComment, checkExistingRequest, checkOwner, addComment);
router.get('/:id', validateToken, checkExistingRequest, checkOwner, getComments);
export default router;
