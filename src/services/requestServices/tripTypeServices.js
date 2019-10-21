import models from '../../database/models/index';

const findOne = (query, scope = null) => models.tripTypes.scope(scope)
  .findOne(query).then(type => type);

const countAll = query => models.tripTypes.count(query).then(finalCount => finalCount);

module.exports = {
  findOne, countAll
};
