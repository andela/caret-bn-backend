/* eslint-disable no-restricted-globals */
/* eslint-disable  import/prefer-default-export */
/* eslint-disable  indent */
/* eslint-disable  max-len */

export const getRatings = async (accommodation, userId) => {

    if (accommodation) {
        const ratings = await accommodation.getRatings();
        const bookmarks = await accommodation.getBookmarks();
        const hasRated = ratings.some(rating => rating.userId === userId);
        const hasBookmarked = bookmarks.some(bookmark => bookmark.userId === userId);
        const summation = await ratings.reduce((averageValue, cuurentValue) => averageValue + cuurentValue.rating, 0);
        const averageRating = summation / ratings.length;
        accommodation.dataValues.hasRated = hasRated;
        accommodation.dataValues.hasBookmarked = hasBookmarked;
        accommodation.dataValues.averageRating = (!isNaN(averageRating) ? parseFloat(averageRating.toFixed(1)) : 0);
        accommodation.dataValues.ratings = ratings;
    }

    return accommodation;
};
