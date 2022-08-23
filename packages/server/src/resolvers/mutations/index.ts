import { Test } from "../../../../graphql/server";
import { MutationResolvers } from "../../../../graphql/server";
import { createAccount } from "./createAccount";
import { createAsset } from "./createAsset";
import { chargeAsset } from "./chargeAsset";
import { login } from "./login";

const testMutation = (_parent:any, args:any):Test => {
  return {name:"test2"}
};

export const Mutation:MutationResolvers = {
  testMutation,
  createAccount,
  createAsset,
  chargeAsset,
  login
};