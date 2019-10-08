import express from 'express';
import UserController from '../../controllers/userController';
import checkSignup from '../../middlewares/checkSignup';
import checkLogin from '../../middlewares/checkLogin';
import verifyExist from '../../middlewares/verifyExist';
import confirmPassword from '../../middlewares/confirmPassword';

const { signup, signIn } = UserController;

const router = express.Router();
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
 *       '201':
 *         description: User Created Successfully
 *       '400':
 *         description: Bad Request, Unable to sign up user
 */
/**
 * @swagger
 * definitions:
 *   login:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         example: user@caretbn.com
 *       password:
 *         type: string
 *         format: string
 *         example: Pa55W0rd
 */
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Authentication
 *     name: login a User
 *     summary: login a User
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *          $ref: '#/definitions/login'
 *     responses:
 *       '200':
 *         description: User logged in successfully!
 *       '400':
 *         description: Incorrect email or password!
 *
 */
router.post('/register', checkSignup, verifyExist, confirmPassword, signup);
router.post('/login', checkLogin, signIn);

export default router;
