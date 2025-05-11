import nodemailer from "nodemailer";
import { EMAIL_PASS, EMAIL_USER } from "../config";

export const sendEmail = async (to: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP (recommended for production)
    auth: {
      user: EMAIL_USER,     // your Gmail or SMTP user
      pass: EMAIL_PASS, // your Gmail app password or SMTP password
    },
  });

  const mailOptions = {
    from:EMAIL_USER,
    to,
    subject: "Your OTP Code",
    text: message,
  };

  await transporter.sendMail(mailOptions);
};