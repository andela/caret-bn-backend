import nodemailer from 'nodemailer';

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

export default sendEmail;
