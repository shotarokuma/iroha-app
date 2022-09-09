import { MutationResolvers } from "../../../../graphql/server";
import { createAccount } from "./admin/createAccount";
import { createAsset } from "./admin/createAsset";
import { chargeAsset } from "./admin/chargeAsset";
import { sendingAsset } from "./admin/sendingAsset";
import { receiveAsset } from "./receiveAsset";
import { login } from "./login";

export const Mutation: MutationResolvers = {
  createAccount,
  createAsset,
  chargeAsset,
  sendingAsset,
  receiveAsset,
  login,
};
