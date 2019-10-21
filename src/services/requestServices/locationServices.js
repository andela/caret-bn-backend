import models from '../../database/models/index';

const findOne = (query, scope = null) => models.locations.scope(scope)
  .findOne(query).then(location => location);

const countAll = query => models.locations.count(query).then(finalCount => finalCount);

module.exports = {
  findOne, countAll
};
