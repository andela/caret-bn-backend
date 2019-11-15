/* eslint-disable no-restricted-globals */
/* eslint-disable  import/prefer-default-export */
/* eslint-disable  indent */
/* eslint-disable  max-len */

export const getRatings = async (accommodation, userId) => {

    if (accommodation) {
        const ratings = await accommodation.getRatings();
        const bookmarks = await accommodation.getBookmarks();
        const likes = await accommodation.getLikes({ where: { status: true } });
        const unlikes = await accommodation.getLikes({ where: { status: false } });
        const Likes = likes.length;
        const Unlikes = unlikes.length;
        const hasRated = ratings.some(rating => rating.userId === userId);
        const hasBookmarked = bookmarks.some(bookmark => bookmark.userId === userId);
        const hasLiked = likes.some(like => like.userId === userId);
        const hasUnliked = unlikes.some(unlike => unlike.userId === userId);
        const summation = await ratings.reduce((averageValue, cuurentValue) => averageValue + cuurentValue.rating, 0);
        const averageRating = summation / ratings.length;
        accommodation.dataValues.hasRated = hasRated;
        accommodation.dataValues.hasBookmarked = hasBookmarked;
        accommodation.dataValues.averageRating = (!isNaN(averageRating) ? parseFloat(averageRating.toFixed(1)) : 0);
        accommodation.dataValues.ratings = ratings;

        accommodation.dataValues.Likes = Likes;
        accommodation.dataValues.Unlikes = Unlikes;
        accommodation.dataValues.hasLiked = hasLiked;
        accommodation.dataValues.hasUnliked = hasUnliked;
    }

    return accommodation;
};
