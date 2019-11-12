import responseHelper from '../utils/responseHelper';

export default (req, res, next) => {
  const { query } = req;

  const keys = Object.keys(query);

  if (keys.length === 0) {
    return responseHelper(res, 'No search Parameters Provided', null, 404);
  }

  const searchKeys = keys.map(key => {
    if (key === 'location'
      || key === 'name'
      || key === 'description'
      || key === 'highlights'
      || key === 'amenities') {
      return true;
    }
    return false;
  });

  const invalidKeys = searchKeys.filter(key => key === false);

  if (invalidKeys.length > 0) {
    return responseHelper(res, 'You Provided Invalid Search Keys. Only Name, Description & Locaton Allowed.', null, 400);
  }

  if (query.location === ''
    || query.name === ''
    || query.description === ''
    || query.highlights === ''
    || query.amenities === '') {
    return responseHelper(res, 'Search keys cannot be null', null, 400);
  }

  next();
};
