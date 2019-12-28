/* eslint-disable  require-jsdoc */
import moment from 'moment';
import models from '../database/models';

export default class notifServices {
  static async notifSaver(notif) {
    const notification = await notif.save();
    return notification;
  }

  static async allNotif(query) {
    const notifications = await models.notifications.findAll(query);
    return notifications;
  }

  static async oneNotif(id, userNotified) {
    const notification = await models.notifications.findOne({
      where: {
        id,
        userNotified,
      }
    });
    return notification;
  }

  static async updateNotif(query) {
    const findNotification = await models.notifications.findOne(query);

    if (!findNotification) {
      throw new Error('Notification Not Available');
    }
    const whereClause = query.where;
    try {
      const updatedNotif = await models.notifications.update(
        { isRead: !findNotification.isRead },
        {
          where: whereClause, returning: true, plain: true,
        }
      );
      return updatedNotif[1];
    } catch (error) {
      throw new Error(`Something went wrong: ${error.message}`);
    }
  }

  static async notifBuilder(entity, entityId, userNotified, activity) {
    const timestamp = moment().format('HH:mm:ss');
    const notification = await models.notifications.build({
      entity,
      entityId,
      userNotified,
      activity,
      timestamp,
    });
    return notification;
  }

}
