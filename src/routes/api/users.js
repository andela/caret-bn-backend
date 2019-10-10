import Router from 'express';
import UserController from '../../controllers/userController';
import checkSignup from '../../middlewares/checkSignup';
import verifyExist from '../../middlewares/verifyExist';
import confirmPassword from '../../middlewares/confirmPassword';

const router = new Router();

const { signup } = UserController;

/**
 * @swagger
 * definitions:
 *   UserSignup:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *         example: krinkun09
 *       email:
 *         type: string
 *         example: krinkun09@gmail.com
 *       password:
 *         type: string
 *         format: string
 *         example: Pa$sW0rd
 *       confirmPassword:
 *         type: string
 *         format: password
 *         example: Pa$sW0rd
 *       required:
 *         - username
 *         - email
 *         - password
 */
/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Authentication
 *     name: Signup a new User
 *     summary: Signup a new User
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *          $ref: '#/definitions/UserSignup'
 *     responses:
 *       '200':
 *         description: Users Retrieved Successfully
 *       '404':
 *         description: Users not found
 */
router.post('/register', checkSignup, verifyExist, confirmPassword, signup);
router.get('/verify/:token', UserController.userVerify);
export default router;
