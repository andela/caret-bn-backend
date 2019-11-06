import express from 'express';
import chatController from '../../controllers/chatController';
import validateToken from '../../middlewares/auth/validateToken';

const { viewChats } = chatController;

const router = express.Router();
router.get('/', validateToken, viewChats);

export default router;
