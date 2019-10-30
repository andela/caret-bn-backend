import models from '../database/models/index';

export const findRatingService = query => models.ratings.findAll(query).then(rating => rating);

export const storeRatingService = ({ rating, accommodationId, feedback = null }, userId) => {
  const ratings = models.ratings.build({
    userId,
    accommodationId,
    rating,
    feedback
  });

  return ratings.save().then(rating => rating);
};
