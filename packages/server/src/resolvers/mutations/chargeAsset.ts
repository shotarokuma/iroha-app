import { charge } from "../../logic/chargeAsset";

export const chargeAsset = async (
  _parent: any,
  args: any
): Promise<boolean> => {
  const { asset, amount } = args.input;
  try {
    charge(asset, amount);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
