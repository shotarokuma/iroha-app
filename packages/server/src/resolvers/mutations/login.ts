import { Role } from "../../../../graphql/server";
import { auth } from "../../auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { pool } from "../../db";
dotenv.config();

export const login = async (_parent, args, context): Promise<string> => {
  if (!auth(context.role)) throw Error("Authorization fails");
  const { account, password } = args.input;
  try {
    const res = await pool.query(`
      SELECT *
      FROM iroha_user 
      WHERE account = '${account}' 
    `);
    if (await bcrypt.compare(password, res.rows[0].password)) {
      const token = jwt.sign(
        {
          account: account,
          role: Role.Admin,
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
