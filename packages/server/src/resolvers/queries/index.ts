import { QueryResolvers } from "../../../../graphql/server";
import { getAsset } from "./getAsset";
import { getTransaction } from "./admin/getTransaction";

export const Query: QueryResolvers = {
  getAsset,
  getTransaction,
};
