import Utilities from '../../utils/index';

export default (req, res, next) => {
  const token = Utilities.tokenHelper(req.user);
  req.user.dataValues.token = token;
  next();
};
