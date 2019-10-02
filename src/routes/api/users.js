import Router from 'express';
import userServices from '../../services/userServices';
const router = new Router();


router.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        data: userServices.allUsers()
    });
});

export default router;