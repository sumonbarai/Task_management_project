const nodemailer = require("nodemailer");
const { SMTP_USER_PASSWORD, SMTP_USER_NAME } = require("../../secret");

const sendEmail = async (EmailTo, EmailText, EmailSubject) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: SMTP_USER_NAME,
      pass: SMTP_USER_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Task Manager  <${SMTP_USER_NAME}>`,
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  return await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
