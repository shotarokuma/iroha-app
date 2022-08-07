import { get } from "../../logic/getAsset";
import { pool } from "../../db";

export const getAsset = async (_parent: any, args: any): Promise<string[]> => {
  const { account } = args.input;
  let privateKey = "";

  try {
    const res  = await pool.query(`
      SELECT privateKey FROM cryptography 
      WHERE publicKey IN (
        SELECT publicKey FROM iroha_user
        WHERE account = '${account}')
    `)

    const asset = await get(account,'');
    return asset;

  } catch (err) {
    console.log(err);
    return err;
  }
};
