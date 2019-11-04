import utilities from '../utils/index';

// eslint-disable-next-line import/prefer-default-export
export const verifyPrivileges = (req, res, next) => {
  const { payload } = req.user;
  if (payload.role === 5) {
    return utilities.responseHelper(
      res,
      'Suppliers aren\'t cannot access this resource',
      null,
      401
    );
  }

  next();
};
