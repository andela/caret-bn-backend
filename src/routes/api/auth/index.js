import { Router } from 'express';

import googleRoutes from './social/google';
import facebookRoutes from './social/facebook';
import '../../../config/social/config';

const router = new Router();


router.use('/google', googleRoutes);
router.use('/facebook', facebookRoutes);

export default router;
