import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { pool } from "../../db";
dotenv.config();

export const login = async (_parent, args): Promise<string> => {
  const { account, password, role } = args.input;
  try {
    const res = await pool.query(`
      SELECT *
      FROM iroha_user 
      WHERE account = '${account}' 
    `);
    if (res.rows.length === 0) {
      throw Error("invalid password");
    }
    if (await bcrypt.compare(password, res.rows[0].password)) {
      const token = jwt.sign(
        {
          account: account,
          role: role,
        },
        process.env.TOKEN_KEY,
        {
          expiresIn: "1h",
        }
      );
      return token;
    } else {
      throw Error("invalid password");
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};
