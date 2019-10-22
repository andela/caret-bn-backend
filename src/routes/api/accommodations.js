import express from 'express';
import multipart from 'connect-multiparty';
import AccommodationController from '../../controllers/accommodationController';
import validateToken from '../../middlewares/auth/validateToken';
import InputValidation from '../../middlewares/inputValidation';
import checkRole from '../../middlewares/checkRole';
import isAccommodationFound from '../../middlewares/isAccommodationFound';
import isOwner from '../../middlewares/isOwner';
import checkId from '../../middlewares/checkId';
import catchEmptyForm from '../../middlewares/catchEmptyForm';

const router = express.Router();
const multipartMiddleware = multipart();

const {
  createAccommodation,
  getMyAccommodations,
  getAllAccommodations,
  editAccommodation,
  deleteAccommodation
} = AccommodationController;

const {
  validateAddNew, validateImage, validateExistence, validateAccommodationEdit
} = InputValidation;
const { checkAdminRole, checkSupplierRole } = checkRole;

router.post('/', validateToken, checkSupplierRole, multipartMiddleware, validateAddNew, validateExistence, validateImage, createAccommodation);
router.get('/myAccommodations', validateToken, getMyAccommodations);
router.get('/allAccommodations', validateToken, checkAdminRole, getAllAccommodations);


/**
 * @swagger
 * definitions:
 *   editAccommodation:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Park Inn Hotel
 *       description:
 *         type: string
 *         example: Lorem Ipsum
 *       location:
 *         type: string
 *         example: Kampala Office
 *       availableSpace:
 *         type: string
 *         example: 15
 *       cost:
 *         type: integer
 *         example: 150
 *       highlights:
 *         type: string
 *         example: Lorem Ipsum
 *       amenities:
 *         type: string
 *         example: Lorem Ipsum
 *       owner:
 *         type: integer
 *         example: 2
 *       images:
 *         type: string
 *         example: "http://res.cloudinary.com/codeal/image/upload/v15712/19161/itwk2ro51fa8luaspg8j.png"
 *       required:
 *         - username
 *         - email
 *         - password
 */
/**
 * @swagger
 * /accommodations/{id}/edit:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accommodations
 *     name: Edit an Accommodation
 *     summary: Edit an Accommodation
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *       - name: body
 *         in: body
 *         schema:
 *          $ref: '#/definitions/editAccommodation'
 *     responses:
 *       '200':
 *         description: Accommodation Edited Successfully
 *       '404':
 *         description: Accommodation Not Found
 */
/**
 * @swagger
 * /accommodations/{id}/delete:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accommodations
 *     name: Delete an Accommodation
 *     summary: Delete an Accommodation
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *     responses:
 *       '200':
 *         description: Accommodation Deleted successfully!
 *       '404':
 *         description: Accommodation Not Found!
 */
router.patch('/:id/edit', validateToken, checkId, catchEmptyForm, multipartMiddleware, isAccommodationFound, isOwner, validateAccommodationEdit, editAccommodation);
router.delete('/:id/delete', validateToken, checkId, isAccommodationFound, isOwner, deleteAccommodation);

export default router;
