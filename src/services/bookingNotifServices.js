import models from '../database/models';

export default class bookingNotifServices {
  static async bookingNotifSaver(notif) {
    const notification = await notif.save();
    return notification;
  }

  static async bookingAllNotif(userNotified) {
    const notifications = await models.bookingNotifications.findAll({ where: { userNotified } });
    return notifications;
  }

  static async bookingOneNotif(id, userNotified) {
    const notification = await models.bookingNotifications.findOne({
      where: {
        id,
        userNotified,
      }
    });
    return notification;
  }

  static async bookingNotifBuilder(booking, userNotified, activity) {
    const notification = await models.bookingNotifications.build({
      bookingId: booking.id,
      userNotified,
      activity,
    });
    return notification;
  }

}
