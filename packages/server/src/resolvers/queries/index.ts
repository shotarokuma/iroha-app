import { QueryResolvers } from "../../../../graphql/server";
import { getAsset } from "./admin/getAsset";

export const Query: QueryResolvers = {
  getAsset,
};
