import models from '../../database/models/index';

const countAll = query => models.locations.count(query).then(finalCount => finalCount);

module.exports = {
  countAll
};
