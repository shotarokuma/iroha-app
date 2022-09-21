import { Role } from "../../../../graphql/server";
import { auth } from "../../auth";
import { transfer } from "../../logic/transferAsset";
import * as dotenv from "dotenv";
import { pool } from "../../db";
dotenv.config();

export const exchangeAsset = async (
  _parent,
  args,
  context
): Promise<boolean> => {
  if (!auth(context.role, Role.User)) throw Error("Authorization fails");
  const { account, asset, item, price } = args.input;
  try {
    const data = await pool.query(`
      SELECT privateKey FROM cryptography
      WHERE publicKey = (SELECT publicKey FROM iroha_user
      WHERE account = '${account}');
    `);

    if (data.rows.length === 0) {
      throw Error("There are no any keys related your account");
    }

    await transfer(
      account,
      process.env.ADMIN_ID,
      price,
      data.rows[0].privatekey,
      asset
    );
    console.log(`${item} is purchased`);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
