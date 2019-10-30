import models from '../database/models/index';

// eslint-disable-next-line import/prefer-default-export
export const find = query => models.booking.findAll(query).then(booking => booking);
