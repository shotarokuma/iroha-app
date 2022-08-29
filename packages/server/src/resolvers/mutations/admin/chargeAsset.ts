import { Role } from "../../../../../graphql/server";
import { auth } from "../../../auth";
import { charge } from "../../../logic/chargeAsset";

export const chargeAsset = async (_parent, args, context): Promise<boolean> => {
  if (!auth(context.role, Role.Admin)) throw Error("Authorization fails");
  const { asset, amount } = args.input;
  try {
    charge(asset, amount);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
