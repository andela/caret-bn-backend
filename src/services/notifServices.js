import models from '../database/models';

export default class notifServices {
  static async notifSaver(notif) {
    const notification = await notif.save();
    return notification;
  }

  static async allNotif(userNotified) {
    const notifications = await models.notifications.findAll({ where: { userNotified } });
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

  static async updateNotif(id, userNotified) {
    const findNotification = await models.notifications.findOne({
      where: {
        id,
        userNotified,
      }
    });

    if (!findNotification) {
      return null;
    }

    const updatedNotif = await models.notifications.update(
      { isRead: !findNotification.isRead },
      {
        where: { id, userNotified }, returning: true, plain: true,
      }
    );
    return updatedNotif[1].dataValues;
  }

  static async notifBuilder(request, userNotified, activity) {
    const notification = await models.notifications.build({
      requestId: request.id,
      userNotified,
      activity,
    });
    return notification;
  }

}
