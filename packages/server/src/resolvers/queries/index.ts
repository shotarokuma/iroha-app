import { QueryResolvers } from "../../../../graphql/server";
import { getAsset } from "./getAsset";

export const Query: QueryResolvers = {
  getAsset,
};
