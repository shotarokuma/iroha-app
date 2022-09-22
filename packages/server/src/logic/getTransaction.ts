import { Transaction } from "../../../graphql/server";
import queries from "iroha-helpers/lib/queries";
import { formlizeTime } from "./formlizeTime";
import { queryService } from "./commands";
import * as dotenv from "dotenv";
dotenv.config();

export const get = (): Promise<Transaction[]> => {
  return new Promise((resolve, reject) => {
    queries
      .getAccountTransactions(
        {
          privateKey: process.env.ADMIN_PRIVATE_KEY,
          creatorAccountId: process.env.ADMIN_ID,
          queryService,
          timeoutLimit: 5000,
        },
        {
          accountId: process.env.ADMIN_ID,
          pageSize: 100,
          firstTxHash: undefined,
          firstTxTime: undefined,
          lastTxTime: undefined,
          firstTxHeight: undefined,
          lastTxHeight: undefined,
          ordering: {
            field: undefined,
            direction: undefined,
          },
        }
      )
      .then((res) => {
        const data = res["transactionsList"].map((t) => ({
          created: formlizeTime(t["payload"]["reducedPayload"]["createdTime"]),
          command: JSON.stringify(
            t["payload"]["reducedPayload"]["commandsList"][0]
          ),
        }));
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
