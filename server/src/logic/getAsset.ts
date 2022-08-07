import queries from "iroha-helpers/lib/queries";
import { queryService } from "./commands";

export const get = (
  account: String,
  privateKey: String
): Promise<String[] | any> => {
  return new Promise((resolve, reject) => {
    console.log(account);
    console.log(privateKey)
    queries
      .getAccountAssets(
        {
          privateKey: [privateKey],
          creatorAccountId: account,
          queryService,
          timeoutLimit: 5000,
        },
        {
          accountId: account,
          pageSize: 100,
          firstAssetId: undefined,
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
