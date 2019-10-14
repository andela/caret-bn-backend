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
 *   GoogleplusAuth:
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
 * /auth/google:
 *   post:
 *     tags:
 *       - Authentication
 *     name: Signup / Login a new User via GooglePlus
 *     summary: Signup / Login a new User via GooglePlus
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: access_token
 *         in: body
 *         schema:
 *          $ref: '#/definitions/GoogleplusAuth'
 *     responses:
 *       '200':
 *         description: Authenticated User Successfully
 */

router.post(
  '/', passport.authenticate('google-plus-token', { session: false, scope: ['profile', 'email'] }),
  tokenMiddleware,
  socialAuthenticationController.authenticateUser,
  errorHandler
);

export default router;
