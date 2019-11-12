import responseUtil from '../utils/responseUtil';
import strings from '../utils/stringsUtil';
import findBookmarks from '../services/bookmarksServices';

const { YOUR_BOOKMARKS, NO_BOOKMARKS } = strings.bookmarks;

class BoookmarksController {
  static async viewBookmarks(req, res) {
    const { id } = req.user.payload;
    const bookmarks = await findBookmarks({ userId: id });

    return responseUtil(res, 200, (!bookmarks.length)
      ? NO_BOOKMARKS : YOUR_BOOKMARKS, bookmarks);
  }
}

export default BoookmarksController;
