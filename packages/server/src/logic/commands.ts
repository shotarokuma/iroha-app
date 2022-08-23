import grpc from "grpc";
import {
  CommandService_v1Client as CommandService,
  QueryService_v1Client as QueryService,
} from "iroha-helpers/lib/proto/endpoint_grpc_pb";
import * as dotenv from "dotenv";
dotenv.config();

const IROHA_ADDRESS = process.env.IROHA_PORT || "localhost:50051";

export const commandService = new CommandService(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
);

export const queryService = new QueryService(
  IROHA_ADDRESS,
  grpc.credentials.createInsecure()
);
