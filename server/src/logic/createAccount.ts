import grpc from "grpc";

import { CommandService_v1Client as CommandService } from "iroha-helpers/lib/proto/endpoint_grpc_pb";

import commands from "iroha-helpers/lib/commands";
import { createKey } from "./createKey";

const IROHA_ADDRESS = 'localhost:50051';

export const adminPriv =
  "f101537e319568c765b2cc89698325604991dca57b9716b58016b253506cab70";


export const adminId = "admin@japan";
const commandService = new CommandService(IROHA_ADDRESS,grpc.credentials.createInsecure());

export const create = (accountName: String) => {
  return new Promise(() => {
    const keys = createKey(accountName, "japan");
    commands
      .createAccount(
        {
          privateKeys: [adminPriv],
          creatorAccountId: adminId,
          quorum: 1,
          commandService,
          timeoutLimit: 5000,
        },
        {
          accountName: accountName,
          domainId: "japan",
          publicKey: keys[0],
        }
      )
  });
};
