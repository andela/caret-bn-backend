import models from '../../database/models/index';

const countAll = query => models.locations.count(query).then(finalCount => finalCount);

const findAll = () => models.locations.findAll().then(res => res);
const findOne = query => models.locations.findOne(query).then(res => res);


module.exports = {
  countAll, findAll, findOne
};
