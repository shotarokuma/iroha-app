import { Role } from "../../../../graphql/server";
import { auth } from "../../auth";
import { transfer } from "../../logic/transferAsset";
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

  try {
    const res = await pool.query(`
    SELECT *
    FROM receive_asset 
    WHERE account = '${account}' 
  `);
    if (res.rows.length === 0) {
      throw Error("there is no asset you can receive");
    }

    for (const row of res.rows) {
      if (await bcrypt.compare(password.toString(), row.password)) {
        await transfer(
          process.env.ADMIN_ID,
          account,
          row.amount,
          process.env.ADMIN_PRIVATE_KEY,
          row.asset
        );
        await pool.query(`
          DELETE FROM receive_asset WHERE password = '${row.password}';
        `);
        return true;
      }
    }
    throw Error("invalid password");
  } catch (err) {
    console.log(err);
    return err;
  }
};
