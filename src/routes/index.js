import Router from 'express';
import apiRoutes from './api';

const router = new Router();
router.use('/api', apiRoutes);

export default router;
