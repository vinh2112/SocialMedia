import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { emailTemplate } from "../templates/email.js";

dotenv.config();

function sendMail(sender, receiver, subject, content) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.PASSWORD_EMAIL,
      },
    });

    var htmlToSend = emailTemplate(content);

    var mailOptions = {
      from: sender,
      to: receiver,
      subject: subject,
      html: htmlToSend,
    };

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        reject({
          message: "Lỗi hệ thống",
        });
      } else {
        resolve(true);
      }
    });
  });
}

const MailService = {
  sendMail,
};

export default MailService;
