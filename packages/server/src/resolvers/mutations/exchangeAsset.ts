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
      SELECT publicKey FROM iroha_user
      WHERE account = '${account}';
    `);

    if (data.rows.length === 0) {
      throw Error("Authorization fails");
    }

    const keyData = await pool.query(`
      SELECT privateKey FROM cryptography
      WHERE publicKey = '${data.rows[0]}';
    `);

    if (keyData.rows.length === 0) {
      throw Error("Authorization fails");
    }

    await transfer(
      account,
      process.env.ADMIN_ID,
      price,
      keyData.rows[0],
      asset
    );
    console.log(`${item} is purchased`);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
