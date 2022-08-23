import { create } from "../../logic/createAsset";

export const createAsset = async (
  _parent: any,
  args: any
): Promise<boolean> => {
  const { asset } = args.input;
  try {
    await create(asset);
    return true;
  } catch (err) {
    console.log(err);
    return err;
  }
};
