import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

const sendEmail = (email, action, name, reasons) => {
  try {
    const message = {
      to: email,
      from: 'Barefoot Nomad Administration',
      subject: `Accommodation ${action}`,
      html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
                <h1 style="color: #848484;">Barefoot Nomad</h1>
                <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">
                This is to notify you that your accommodation was ${action}.<br>
                Details are below <br>
                Accommodation name: ${name} <br> 
                Reasons: ${reasons} </p>
                </a></p>
                <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our system!</p>
                <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Barefoot Nomad Caret Team</p>
                </div>`
    };
    transporter.sendMail(message);
  } catch (error) {
    return error;
  }
};

const resetEmail = (req, email, verifyToken, host) => {
  try {
    const Url = host
      ? `${host}/resetpassword/${verifyToken}`
      : `${req.protocol}://${req.headers.host}/api/v1/users/resetpassword/${verifyToken}`;
    const message = {
      to: email,
      from: 'BarefootNomad@gmail.com',
      subject: 'Barefoot Nomad Reset password Link',
      html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
        <h1 style="color: #848484;">Barefoot Nomad</h1>
        <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Welcome Back,<br> We are happy to be with you. Please you can reset your password now.<br> Click the button below to reset your password.</p>
        <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href="${Url}">Reset password</a>
        </a></p>
        <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our application!</p>
        <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Barefoot Nomad Caret Team</p>
        </div>`
    };
    transporter.sendMail(message);
  } catch (error) {
    return error;
  }
};

const sendVerification = (req, email, token, host, username) => {
  try {
    const Url = host
      ? `${host}/verify/${token}`
      : `${req.protocol}://${req.headers.host}/api/v1/users/verify/${token}`;
    const message = {
      to: email,
      from: 'BarefootNomad@gmail.com',
      subject: 'Account Verification',
      html: `<div style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;padding:35px;">
          <h1 style="color: #848484;">Barefoot Nomad </h1>
          <p style="font-family:Avenir,Helvetica,sans-serif;box-sizing:border-box;color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Welcome ${username},<br> We are happy to be with you. Please verify your mail.<br> Click the button below to verify your new account.</p>
          <p><a style="background-color: #3097d1; border: 2px solid #3097d1; padding: 8px; color: #fff; font-size: 16px; text-decoration: none;cursor: pointer;" href=${Url}>Verify Account</a>
          </a></p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;text-align:left">Thank you for using our system!</p>
          <p style="color:#74787e;font-size:16px;line-height:1.5em;margin-top:0;">Regards,<br>Barefoot Nomad Caret Team</p>
          </div>`
    };
    transporter.sendMail(message);
  } catch (error) {
    return error;
  }
};

export { sendEmail, resetEmail, sendVerification };
