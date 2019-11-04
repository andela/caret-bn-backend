import models from '../../database/models/index';

const findOne = query => models.locations.findOne(query).then(res => res);

module.exports = {
  findOne
};
