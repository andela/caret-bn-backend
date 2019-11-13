import express from 'express';
import chatController from '../../controllers/chatController';
import validateToken from '../../middlewares/auth/validateToken';

const { viewChats, viewPrivateChats } = chatController;

const router = express.Router();
router.get('/', validateToken, viewChats);
router.get('/private', validateToken, viewPrivateChats);

export default router;
