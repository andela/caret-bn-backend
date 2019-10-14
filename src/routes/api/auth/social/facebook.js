import { Router } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import socialAuthenticationController from '../../../../controllers/auth/socialAuthenticationController';
import tokenMiddleware from '../../../../middlewares/auth/tokenMiddleware';
import errorHandler from '../../../../middlewares/errorHandler';


dotenv.config();

const router = new Router();
/**
 * @swagger
* definitions:
 *   FacebookAuth:
 *     type: object
 *     properties:
 *       access_token:
 *         type: string
 *         example: kjjlkjdflf.diosjidjsod.djijsojdosdon-12oj
 *       required:
 *         - access_token
 */
/**
 * @swagger
 * /auth/facebook:
 *   post:
 *     tags:
 *       - Authentication
 *     name: Signup / Login a new User via Facebook
 *     summary: Signup / Login a new User via Facebook
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: access_token
 *         in: body
 *         schema:
 *          $ref: '#/definitions/FacebookAuth'
 *     responses:
 *       '200':
 *         description: Authenticated User Successfully
 */
router.post(
  '/', passport.authenticate('facebook-token', { session: false, scope: 'email' }),
  tokenMiddleware,
  socialAuthenticationController.authenticateUser,
  errorHandler
);
export default router;
