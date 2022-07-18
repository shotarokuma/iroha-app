import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendNotificationCreateAccount = async()=> {
  await transport.sendMail({
    from: process.env.EMAIL_USER,
    to: "shoutarou.kuma59@gmail.com", 
    subject: "test", // Subject line
    text: "test", // plain text body
  })
  .catch((err) => console.log(err));
};
