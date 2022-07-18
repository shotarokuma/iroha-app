import { create } from "../../logic/createAccount";
import { sendNotificationCreateAccount } from "../../logic/sendEmail";
import { pool } from "../../db";

export const createAccount = async (_parent: any, args: any):Promise<boolean> => {
  const { first, last,email,password } = args.input;
  const keys = await create(first[0] + last);
  const account = `${first[0] + last}@japan`;
  try {
    await pool.query(`INSERT INTO iroha_user(account,password,email,publicKey,firstName,lastName) VALUES
    ('${account}','${password}',
    '${email}',
    '${keys[0]}','${first}','${last}');`)
    await pool.query(`INSERT INTO cryptography(privateKey,publicKey) VALUES (
      '${keys[1]}','${keys[0]}'
   );`);
  } catch (err) {
    console.log(err);
    return false;
  };

  try {
    await sendNotificationCreateAccount(email,account,password);
  } catch (err) {
    return false;
  }
  return true;
};
