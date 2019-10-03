import Router from 'express';
import usersRoutes from './users';
import swaggerRoute from '../swagger-doc';


const router = new Router();
router.use('/users', usersRoutes);
router.use('/api-docs', swaggerRoute);

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});

export default router;
