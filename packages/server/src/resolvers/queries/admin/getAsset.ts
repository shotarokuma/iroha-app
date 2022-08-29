import { Asset, Role } from "../../../../../graphql/server";
import { auth } from "../../../auth";
import { get } from "../../../logic/getAsset";
import { pool } from "../../../db";

export const getAsset = async (_parent, args, context): Promise<Asset[]> => {
  if (!auth(context.role, Role.Admin)) throw Error("Authorization fails");
  const { account } = args.input;

  try {
    const res = await pool.query(`
      SELECT privateKey FROM cryptography 
      WHERE publicKey IN (
        SELECT publicKey FROM iroha_user
        WHERE account = '${account}')
    `);
    const asset = await get(account, res.rows[0].privatekey);
    return asset;
  } catch (err) {
    console.log(err);
    return err;
  }
};
