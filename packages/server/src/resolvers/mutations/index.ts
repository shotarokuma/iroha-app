import { MutationResolvers } from "../../../../graphql/server";
import { createAccount } from "./createAccount";
import { createAsset } from "./createAsset";
import { chargeAsset } from "./chargeAsset";
import { login } from "./login";

export const Mutation: MutationResolvers = {
  createAccount,
  createAsset,
  chargeAsset,
  login,
};
