const catchSearchQueries = (req, res, next) => {
  req.body = { ...req.query };
  const keys = Object.keys(req.query);

  keys.forEach(key => {
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(req.body[key])) {
      req.body[key] = parseInt(req.body[key], 10);
    }
  });

  return next();
};

export default catchSearchQueries;
