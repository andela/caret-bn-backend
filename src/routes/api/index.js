import Router from 'express';
import usersRoutes from './users';
import adminRoutes from './admin';
import authRoutes from './auth/index';
import requestRoutes from './requests';
import accommodationsRoutes from './accommodations';
import notificationsRoutes from './notifications';
import swaggerRoute from '../swagger-doc';
import ratingRoutes from './ratings';

const router = new Router();
router.use('/auth', authRoutes);
router.use('/requests', requestRoutes);
router.use('/admin', adminRoutes);
router.use('/users', usersRoutes);
router.use('/accommodations', accommodationsRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/ratings', ratingRoutes);
router.use('/api-docs', swaggerRoute);

export default router;
