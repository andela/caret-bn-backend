import Router from 'express';
// import userServices from '../../services/userServices';

const router = new Router();

/**
 * @swagger
 * definitions:
 *   UserSignup:
 *     type: object
 *     properties:
 *       username:
 *         type: string
 *       email:
 *         type: string
 *       bio:
 *         type: string
 *       image:
 *         type: string
 *       password:
 *         type: string
 *         format: password
 *       required:
 *         - username
 *         - email
 *         - password
 */
/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Authentication
 *     name: Get All Users
 *     summary: Get All Users
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: Users Retrieved Successfully
 *       '404':
 *         description: Users not found
 */
router.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Users retrieved successfully',
  });
});

export default router;
