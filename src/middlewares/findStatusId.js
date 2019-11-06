const findStatusId = (req, res, next) => {
  const { status } = req.body;
  let statusId;

  switch (status) {
  case 'pending':
    statusId = 1;
    break;
  case 'approved':
    statusId = 3;
    break;
  default:
    statusId = 2;
    break;
  }
  req.body = { statusId };
  return next();
};

export default findStatusId;
