import { Role } from "../../../../../graphql/server";
import { auth } from "../../../auth";
import { create } from "../../../logic/createAsset";

export const createAsset = async (_parent, args, context): Promise<boolean> => {
  if (!auth(context.role, Role.Admin)) throw Error("Authorization fails");
  const { asset } = args.input;
  try {
    await create(asset);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
