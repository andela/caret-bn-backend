/* eslint-disable  import/prefer-default-export */
/* eslint-disable  indent */
/* eslint-disable  max-len */
export const getRatings = async (accommodation, userId) => {

    if (accommodation) {
        const ratings = await accommodation.getRatings();
        const hasRated = ratings.some(rating => rating.userId === userId);
        const summation = await ratings.reduce((averageValue, cuurentValue) => averageValue + cuurentValue.rating, 0);
        const averageRating = summation / ratings.length;
        accommodation.dataValues.hasRated = hasRated;
        accommodation.dataValues.averageRating = averageRating;
        accommodation.dataValues.ratings = ratings;
    }

    return accommodation;
};
