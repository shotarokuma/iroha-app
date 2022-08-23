import commands from "iroha-helpers/lib/commands";
import { commandService } from "./commands";
import { createKey } from "./createKey";
import * as dotenv from "dotenv";
dotenv.config();

export const create = (accountName: string): Promise<string[] | any> => {
  return new Promise((resolve, reject) => {
    const keys = createKey(accountName, process.env.DOMAIN);
    commands
      .createAccount(
        {
          privateKeys: [process.env.ADMIN_PRIVATE_KEY],
          creatorAccountId: process.env.ADMIN_ID,
          quorum: 1,
          commandService,
          timeoutLimit: 5000,
        },
        {
          accountName: accountName,
          domainId: process.env.DOMAIN,
          publicKey: keys[0],
        }
      )
      .then(() => {
        resolve(keys);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
