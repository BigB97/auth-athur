/* eslint-disable consistent-return */
const nodemailer = require('nodemailer');
const mg = require('nodemailer-mailgun-transport');

module.exports = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport(
      mg({
        auth: {
          api_key: process.env.MAIL_KEY,
          domain: process.env.MAIL_DOMAIN,
        },
      }),
    );

    const mailOptions = {
      from: 'ybolaji1@gmail.com',
      to: email,
      subject,
      html: message,
    };

    const isSent = transporter.sendMail(mailOptions, (err, info) => {
      if (err) console.log({ err });
      console.log('Message sent: %s', info);
    });

    console.log({ isSent });
    return isSent;
  } catch (error) {
    console.log({ errorMail: error.message });
    return `${error}`;
  }
};
