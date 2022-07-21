import { get } from "../../logic/getAsset";
import { pool } from "../../db";

export const getAsset = async (_parent: any, args: any): Promise<boolean> => {
  const { account } = args.input;
  let privateKey = "";
  let publicKey = "";

  try {
    const res = await pool.query(`
      SELECT publicKey 
      FROM iroha_user
      WHERE account = '${account}'
    `);
    publicKey = res.rows[0].publicKey;
  } catch (err) {
    console.log(err);
    return false;
  }

  try {
    const res = await pool.query(`
      SELECT privateKey
      FROM cryptography
      WHERE publicKey = '${publicKey}'
    `);
    privateKey = res.rows[0].privateKey;
  } catch (err) {
    console.log(err);
    return false;
  }

  try {
    await get(account, privateKey);
  } catch (err) {
    console.log(err);
    return false;
  }

  return true;
};
