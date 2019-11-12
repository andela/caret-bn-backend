import db from '../database/models';
import responseUtil from '../utils/responseUtil';

const findBookmarks = data => {
  try {
    const myBookmarks = db.bookmarks.findAll({
      where: data,
      attributes: { exclude: ['userId', 'accommodationId'] },
      include: [{
        model: db.accommodations,
        as: 'accommodation',
        attributes: { exclude: ['owner', 'locationId'] },
        include: [
          { model: db.users, as: 'ownerUser', attributes: ['id', 'username', 'email'] },
          { model: db.locations, as: 'accommodationLocation', attributes: ['id', 'name'] },
        ],
      }],
    });
    return myBookmarks;
  } catch (error) {
    return responseUtil(500, 'Ooops Something unexpected happened!');
  }

};

export default findBookmarks;
