import Utilities from '../utils/index';

// eslint-disable-next-line no-unused-vars
export default (err, req, res, next) => Utilities.responseHelper(
  res,
  err.message,
  err,
  (typeof (err.oauthError) !== 'object' ? err.oauthError : err.oauthError.statusCode)
);
