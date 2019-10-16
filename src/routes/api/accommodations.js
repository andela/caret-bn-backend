import express from 'express';
import multipart from 'connect-multiparty';
import accommodationController from '../../controllers/accommodationController';
import validateToken from '../../middlewares/auth/validateToken';
import InputValidation from '../../middlewares/inputValidation';
import checkRole from '../../middlewares/checkRole';

const router = express.Router();
const multipartMiddleware = multipart();

const { createAccommodation, getMyAccommodations, getAllAccommodations } = accommodationController;
const { validateAddNew, validateImage, validateExistence } = InputValidation;
const { checkAdminRole, checkSupplierRole } = checkRole;

router.post('/', validateToken, checkSupplierRole, multipartMiddleware, validateAddNew, validateExistence, validateImage, createAccommodation);
router.get('/myAccommodations', validateToken, getMyAccommodations);
router.get('/allAccommodations', validateToken, checkAdminRole, getAllAccommodations);

export default router;
