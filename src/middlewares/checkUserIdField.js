const checkUserIdField = (req, res, next) => {
  req.body.userId = req.user.payload.id;
  return next();
};

export default checkUserIdField;
