import { Role } from "../../../../graphql/server";
import { auth } from "../../auth";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { pool } from "../../db";
dotenv.config();

export const receiveAsset = async (
  _parent,
  args,
  context
): Promise<boolean> => {
  if (!auth(context.role, Role.User)) throw Error("Authorization fails");
  const { account, password } = args.input;
  const encryptedPassword = await bcrypt.hash(password.toString(), 10);

  try {
    const res = await pool.query(`
    SELECT *
    FROM receive_asset 
    WHERE password = '${encryptedPassword}' AND account = '${account}' 
  `);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
