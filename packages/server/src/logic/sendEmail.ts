import nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendNotificationCreateAccount = async (
  to: string,
  account: string,
  password: string
) => {
  try {
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "NO REPLY",
      text: `Thank you for utilizing our iroha-app
      your account was created
      account name: ${account}
      password: ${password}
      
      Shotaro Kumagai
      `,
    });
  } catch (err) {
    console.log(err);
  }
};

export const sendReceiveAssetEmail = async (
  to: string,
  account: string,
  amount: string,
  password: number,
  asset: string
) => {
  try {
    await transport.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: "NO REPLY",
      text: `Thank you for utilizing our iroha-app
      
      please enter ${password} on your page
      your account(${account}) was charged
      bitcoin: ${asset}
      amount: ${amount}
      
      Shotaro Kumagai
      `,
    });
  } catch (err) {
    console.log(err);
  }
};
