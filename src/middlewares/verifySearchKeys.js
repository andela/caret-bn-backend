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
      || key === 'amenities'
      || key === 'rating') {
      return true;
    }
    return false;
  });

  const invalidKeys = searchKeys.filter(key => key === false);

  if (invalidKeys.length > 0) {
    return responseHelper(res, 'You Provided Invalid Search Keys. Only Name, Description, Highlights, Amenities & Locaton Allowed.', null, 400);
  }

  if (query.location === ''
    || query.name === ''
    || query.description === ''
    || query.highlights === ''
    || query.amenities === ''
    || query.rating === '') {
    return responseHelper(res, 'Search keys cannot be null', null, 400);
  }

  if (query.rating) {
    const rating = parseFloat(query.rating);
    if (rating % 1 !== 0 || rating < 1) {
      return responseHelper(res, 'Please use whole numbers greater than 0', null, 400);
    }
  }

  next();
};
