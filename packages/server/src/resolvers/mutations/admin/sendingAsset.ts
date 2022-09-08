import { Role } from "../../../../../graphql/server";
import { auth } from "../../../auth";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { sendReceiveAssetEmail } from "../../../logic/sendEmail";
import { pool } from "../../../db";
dotenv.config();

export const sendingAsset = async (
  _parent,
  args,
  context
): Promise<boolean> => {
  if (!auth(context.role, Role.Admin)) throw Error("Authorization fails");
  const { account, asset, amount } = args.input;
  const password = Math.floor(Math.random() * 900) + 100;

  try {
    const encryptedPassword = await bcrypt.hash(password.toString(), 10);
    await pool.query(
      `INSERT INTO receive_asset(account, asset, amount, password) VALUES('${account}','${asset}','${amount}','${encryptedPassword}');`
    );
    const res = await pool.query(`
    SELECT *
    FROM iroha_user 
    WHERE account = '${account}' 
  `);

    await sendReceiveAssetEmail(
      res.rows[0].email,
      account,
      amount,
      password,
      asset
    );
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
