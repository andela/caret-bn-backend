import express from 'express';
import UserController from '../../controllers/userController';
import checkSignup from '../../middlewares/checkSignup';
import EmailToken from '../../utils/EmailToken';
import validateResetpassword from '../../middlewares/checkResetpassword';
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
 */
/**
 * @swagger
 * /users/verify/{token}:
 *   get:
 *     tags:
 *       - Authentication
 *     name: Email Verification
 *     summary: Email Verification
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *     responses:
 *       '200':
 *         description: User successfully verified!
 *       '404':
 *         description: User no registered!
 */
/**
 * @swagger
 * definitions:
 *   forgotpassword:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         example: krinkun09@gmail.com
 */
/**
 * @swagger
 * users/forgotpassword:
 *   post:
 *     tags:
 *       - Authentication
 *     name: Forgotpassword
 *     summary: Send link on Email
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *          $ref: '#/definitions/forgotpassword'
 *     responses:
 *       '200':
 *         description: please check your email to see the link for reseting password
 *       '400':
 *         description: can not find that user
 */
/**
 * @swagger
 * definitions:
 *   resetpassword:
 *     type: object
 *     properties:
 *       email:
 *         type: string
 *         example: krinkun09@gmail.com
 *       newpassword:
 *         type: string
 *         format: string
 *         example: Pa55W0rd
 *       confirmpassword:
 *         type: string
 *         format: string
 *         example: Pa55W0rd
 */
/**
 * @swagger
 * users/resetpassword/{token}:
 *   patch:
 *     tags:
 *       - Authentication
 *     name: Reset password
 *     summary: change password of the user
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: token
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *          $ref: '#/definitions/resetpassword'
 *     responses:
 *       '200':
 *         description: password changed successfully'
 *       '404':
 *         description: can not find that user
 *       '409':
 *         description: you can not change password with old password
 *       '403':
 *         description: you are not authorized to access this endpoint
 *       '400':
 *         description: Token expired request a new one
 */

router.post('/register', checkSignup, verifyExist, confirmPassword, signup);
router.get('/verify/:token', UserController.userVerify);
router.post('/forgotpassword', validateResetpassword.checkEmail, UserController.Providelink);
router.patch('/resetpassword/:token', EmailToken.UseraccessRequired, validateResetpassword.checkReset, UserController.Changepassword);
router.post('/login', checkLogin, signIn);

export default router;
