/* eslint-disable import/prefer-default-export */
import models from '../database/models/index';

export const getLocations = query => models.locations.findAll(query).then(locations => locations);
