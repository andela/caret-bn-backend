import Router from 'express';
import usersRoutes from './users';
import authRoutes from './auth/index';
import requestRoutes from './requests';
import swaggerRoute from '../swagger-doc';
import accommodationRoutes from './accommodations';


const router = new Router();
router.use('/auth', authRoutes);
router.use('/requests', requestRoutes);
router.use('/users', usersRoutes);
router.use('/api-docs', swaggerRoute);
router.use('/accommodation', accommodationRoutes);

export default router;
