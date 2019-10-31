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
  getAllAccommodations,
  editAccommodation,
  deleteAccommodation,
  bookAccommdation,
  viewBookings,
  viewSpecificAccommodation,
  accommodationActivation,
  viewDeactivated,
} = AccommodationController;

const {
  validateAddNew,
  validateImage,
  validateExistence,
  validateAccommodationEdit,
  validateBooking,
  validateReasons,
} = InputValidation;
const { checkSupplierRole, checkBookingRole } = checkRole;

/**
 * @swagger
 * definitions:
 *   createAccommodation:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Muhabura Resort
 *       description:
 *         type: string
 *         example: Lorem Ipsum
 *       locationId:
 *         type: integer
 *         example: 2
 *       availableSpace:
 *         type: string
 *         example: 20
 *       cost:
 *         type: integer
 *         example: 1000
 *       currency:
 *         type: string
 *         example: USD
 *       highlights:
 *         type: string
 *         example: Lorem Ipsum
 *       amenities:
 *         type: string
 *         example: Lorem Ipsum
 *       image:
 *         type: string
 *         example: src/tests/mockData/AI.png
 */
/**
 * @swagger
 * /accommodations:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accommodations
 *     name: Create an Accommodation
 *     summary: Create an Accommodation
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *          $ref: '#/definitions/createAccommodation'
 *     responses:
 *       '201':
 *         description: New accommodation facility added successfully!
*/
/**
 * @swagger
 * /accommodations:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Accommodations
 *     name: Get all Accommodations
 *     summary: Get all Accommodations
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Accommodation facilities are retrieved successfully!!
*/
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

router.post('/', validateToken, checkSupplierRole, catchEmptyForm, multipartMiddleware, validateAddNew, validateExistence, validateImage, createAccommodation);
router.get('/', validateToken, getAllAccommodations);
router.patch('/:id/edit', validateToken, checkId, catchEmptyForm, multipartMiddleware, isAccommodationFound, isOwner, validateAccommodationEdit, editAccommodation);
router.delete('/:id/delete', validateToken, checkId, isAccommodationFound, isOwner, deleteAccommodation);
router.get('/bookings', validateToken, viewBookings);
router.patch('/book', validateToken, checkBookingRole, validateBooking, bookAccommdation);
router.get('/:slug', validateToken, viewSpecificAccommodation);
router.patch('/activate/:slug', validateToken, validateReasons, accommodationActivation);
router.get('/admin/deactivated', validateToken, viewDeactivated);


export default router;
