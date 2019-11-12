import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';
import findBookmarks from '../services/bookmarksServices';
import getAccommodation from '../helpers/getAccommodation';
import models from '../database/models';

const { NOT_FOUND } = strings.accommodation.success;
const { YOUR_BOOKMARKS, NO_BOOKMARKS } = strings.bookmarks;
const { getOneAccommodation } = getAccommodation;

class BoookmarksController {
  static async viewBookmarks(req, res) {
    const { id } = req.user.payload;
    const bookmarks = await findBookmarks({ userId: id });

    return responseUtil(res, 200, (!bookmarks.length)
      ? NO_BOOKMARKS : YOUR_BOOKMARKS, bookmarks);
  }

  static async bookmark(req, res) {
    const { slug } = req.params;
    const { id } = req.user.payload;

    const accommodation = await getOneAccommodation({ slug, isActivated: true }, id);

    if (!accommodation) {
      return responseUtil(res, 404, NOT_FOUND);
    }

    const bookmark = await models.bookmarks.findOne({
      where: {
        userId: id,
        accommodationId: accommodation.id,
      }
    });

    if (!bookmark) {
      await models.bookmarks.create({ userId: id, accommodationId: accommodation.id });
      return responseUtil(res, 201, 'Accommodation Bookmarked successfully!');
    }

    await models.bookmarks.destroy({ where: { accommodationId: accommodation.id } });
    return responseUtil(res, 200, 'Accommodation Unbookmarked successfully!');
  }
}

export default BoookmarksController;
