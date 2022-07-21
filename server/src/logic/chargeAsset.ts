import commands from "iroha-helpers/lib/commands";
import { commandService } from "./commands";
import * as dotenv from "dotenv";
dotenv.config();

export const charge = (assetId: String, amount: String): Promise<void> => {
  return new Promise((resolve, reject) => {
    commands
      .addAssetQuantity(
        {
          privateKeys: process.env.ADMIN_PRIVATE_KEY,
          creatorAccountId: process.env.ADMIN_ID,
          quorum: 1,
          commandService,
          timeoutLimit: 5000,
        },
        {
          assetId: assetId,
          amount: amount,
        }
      )
      .catch((err) => {
        reject(err);
      });
  });
};
