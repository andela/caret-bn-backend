import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import findUser from './findUser';
import notifServices from '../services/notifServices';

dotenv.config();

const { EMAIL_PASSWORD, EMAIL_ADDRESS } = process.env;
const { notifSaver, notifBuilder } = notifServices;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
});

const notifSender = async (subject, request, userId, APP_URL_BACKEND, activity) => {
  try {
    const user = await findUser({ id: userId });

    if (user.appNotif) {
      const notification = await notifBuilder(request, userId, activity);
      await notifSaver(notification);
    }

    if (user.emailNotif) {
      const { email, username } = user;
      const msg = {
        to: email,
        from: EMAIL_ADDRESS,
        subject,
        html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
          <h1 style="color: #848484;">Barefoot Nomad</h1>
          <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
            Hello dear ${username}, <br> This is to notify you that a request has been ${activity}. <br> Click the button below to view the request.
          </p>
          <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${APP_URL_BACKEND}/api/v1/requests/${request.id}">View request</a></a></p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our system!</p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Barefoot Nomad Caret Team</p>
          </div>`
      };
      transporter.sendMail(msg);
    }
  } catch (error) { return error; }

};

export default notifSender;
