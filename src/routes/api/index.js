import Router from 'express';
import usersRoutes from './users';
import authRoutes from './auth/index';
import swaggerRoute from '../swagger-doc';


const router = new Router();
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/api-docs', swaggerRoute);

export default router;
