import { Router } from 'express';
import passport from 'passport';
import dotenv from 'dotenv';
import socialAuthenticationController from '../../../../controllers/auth/socialAuthenticationController';
import tokenMiddleware from '../../../../middlewares/auth/tokenMiddleware';

dotenv.config();

const router = new Router();

router.post('/', passport.authenticate('facebook-token', { scope: 'email' }), tokenMiddleware, socialAuthenticationController.authenticateUser);

export default router;
