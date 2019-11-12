import express from 'express';
import validateToken from '../../middlewares/auth/validateToken';
import BookmarksController from '../../controllers/bookmarksController';

const router = express.Router();

const { viewBookmarks } = BookmarksController;

router.get('/', validateToken, viewBookmarks);

export default router;
