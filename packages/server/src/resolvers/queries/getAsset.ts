import { Asset } from "../../../../graphql/server";
import { get } from "../../logic/getAsset";
import { pool } from "../../db";

export const getAsset = async (_parent: any, args: any): Promise<Asset[]> => {
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
