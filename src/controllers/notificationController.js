import strings from '../utils/stringsUtil';
import responseUtil from '../utils/responseUtil';
import notifServices from '../services/notifServices';

const { allNotif, oneNotif, updateNotif } = notifServices;
const { NOTIF_NOT_FOUND, NOTIF_FOUND } = strings.notifications;

export default class notificationController {

  static async allNotifications(req, res) {
    const notifications = await allNotif(req.user.payload.id);

    if (!notifications.length) {
      return responseUtil(res, 404, NOTIF_NOT_FOUND);
    }

    return responseUtil(res, 200, NOTIF_FOUND, notifications);
  }

  static async oneNotification(req, res) {
    const notification = await oneNotif(parseInt(req.params.id, 10), req.user.payload.id);

    if (!notification) {
      return responseUtil(res, 404, NOTIF_NOT_FOUND);
    }

    return responseUtil(res, 200, NOTIF_FOUND, notification);
  }

  static async switchRead(req, res) {
    const updatedNotif = await updateNotif(parseInt(req.params.id, 10), req.user.payload.id);

    if (!updatedNotif) {
      return responseUtil(res, 404, NOTIF_NOT_FOUND);
    }

    const status = (updatedNotif.isRead) ? '' : 'un';
    const message = `This notification status has been marked as '${status}read'`;
    return responseUtil(res, 200, message);
  }
}
