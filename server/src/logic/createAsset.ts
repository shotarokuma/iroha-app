import commands from "iroha-helpers/lib/commands";
import { commandService } from "./commands";
import * as dotenv from "dotenv";
dotenv.config();

export const create = async(assetName: String): Promise<void> => {
  const createAssetCommands = [
    commands.createAsset(
      {
        privateKeys: process.env.ADMIN_PRIVATE_KEY,
        creatorAccountId: process.env.ADMIN_ID,
        quorum: 1,
        commandService,
        timeoutLimit: 5000,
      },
      {
        assetName: assetName,
        domainId: process.env.DOMAIN,
        precision: 2,
      }
    ),
    commands.addAssetQuantity(
      {
        privateKeys: process.env.ADMIN_PRIVATE_KEY,
        creatorAccountId: process.env.ADMIN_ID,
        quorum: 1,
        commandService,
        timeoutLimit: 5000,
      },
      {
        assetId: `${assetName}#${process.env.DOMAIN}`,
        amount: "100",
      }
    ),
  ];

  return Promise.resolve()
    .then(async () => {
      await createAssetCommands[0];
    })
    .then(async () => {
      await createAssetCommands[1];
    });
};
