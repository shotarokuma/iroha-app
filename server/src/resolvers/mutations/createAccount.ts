import bcrypt from "bcryptjs";
import { create } from "../../logic/createAccount";
import { sendNotificationCreateAccount } from "../../logic/sendEmail";
import { pool } from "../../db";
import * as dotenv from "dotenv";
dotenv.config();

export const createAccount = async (
  _parent: any,
  args: any
): Promise<boolean> => {
  const first= `${args.input.first}`.toLowerCase();
  const last =  `${args.input.last}`.toLowerCase();
  const { email, password } = args.input;
  const keys = await create(first[0] + last);
  const account = `${first[0] + last}@${process.env.DOMAIN}`;

  try {
    const encryptedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      `INSERT INTO iroha_user(account,password,email,publicKey,firstName,lastName)
       VALUES('${account}','${encryptedPassword}',
    '${email}',
    '${keys[0]}','${first}','${last}');`
    );
    await pool.query(`
      INSERT INTO cryptography(privateKey,     publicKey) 
      VALUES ('${keys[1]}','${keys[0]}');
      `);
  } catch (err) {
    console.log(err);
    return false;
  }

  try {
    await sendNotificationCreateAccount(email, account, password);
  } catch (err) {
    console.log(err);
    return false;
  }
  return true;
};
