/* eslint-disable indent */
/* eslint-disable  require-jsdoc */
import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';
import notifServices from '../services/notifServices';
import { userNotidicationQuery } from '../utils/db/queries/notificationQueries';

const { allNotif, oneNotif, updateNotif } = notifServices;
const { NOTIF_NOT_FOUND, NOTIF_FOUND } = strings.notifications;

export default class notificationController {

  static async allNotifications(req, res) {
    const notifications = await allNotif(userNotidicationQuery(req.user.payload.id));
    const allNotifs = notifications.reverse();
    if (!allNotifs.length) {
      return responseUtil(res, 404, NOTIF_NOT_FOUND);
    }
    return responseUtil(res, 200, NOTIF_FOUND, allNotifs);
  }

  static async oneNotification(req, res) {
    const notification = await oneNotif(parseInt(req.params.id, 10), req.user.payload.id);

    if (!notification) {
      return responseUtil(res, 404, NOTIF_NOT_FOUND);
    }

    return responseUtil(res, 200, NOTIF_FOUND, notification);
  }

  static async switchRead(req, res) {
    const { id } = req.params;
    const userNotified = req.user.payload.id;
    const query = {
      where: {
        id,
        userNotified,
      }
    };

    try {

      const updatedNotif = await updateNotif(query);
      const status = (updatedNotif.isRead) ? '' : 'un';
      const message = `This notification status has been marked as ${status}read`;
      return responseUtil(res, 200, message);
    } catch (error) {
      return responseUtil(res, 404, error.message);
    }
  }

  static async markAll(req, res) {
    let { action } = req.params;
    let isRead;
    switch (action) {
      case 'read':
        isRead = true;
        action = 'read';
        break;
      case 'unread':
        isRead = false;
        action = 'unread';
        break;
      default:
        return responseUtil(res, 400, 'Unspecified action');
    }

    const { id } = req.user.payload;
    const query = { where: { userNotified: id, isRead: !isRead } };
    const notifications = await notifServices.allNotif(query);

    if (notifications.length === 0) {
      return responseUtil(res, 409, `All notifications marked as ${action} already.`);
    }

    Promise.all(notifications.map(async notification => {
      await notification.update({
        isRead
      }).then(notification => {
        try {
          return notification.save();
        } catch (error) {
          return responseUtil(res, 500, 'Unable to complete', error.message);
        }
      });
    }))
      .then(() => responseUtil(res, 200, `marked all notifications as ${action}`))
      .catch(error => responseUtil(res, 500, 'Unable to complete', error.message));

  }
}
