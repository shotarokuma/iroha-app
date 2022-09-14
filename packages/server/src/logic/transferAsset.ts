import commands from "iroha-helpers/lib/commands";
import { commandService } from "./commands";
import * as dotenv from "dotenv";
dotenv.config();

export const transfer = (
  sAccount: string,
  dAccount: string,
  amount: string,
  privateKey: string,
  asset: string
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    commands
      .transferAsset(
        {
          privateKeys: [privateKey],
          creatorAccountId: sAccount,
          quorum: 1,
          commandService,
          timeoutLimit: 5000,
        },
        {
          srcAccountId: sAccount,
          destAccountId: dAccount,
          assetId: asset,
          description: "transfered",
          amount: amount,
        }
      )
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
