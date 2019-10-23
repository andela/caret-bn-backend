import models from '../../database/models/index';

const countAll = query => models.tripTypes.count(query).then(finalCount => finalCount);

module.exports = {
  countAll
};
