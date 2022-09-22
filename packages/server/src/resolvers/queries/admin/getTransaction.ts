import { Role, Transaction } from "../../../../../graphql/server";
import { auth } from "../../../auth";
import { get } from "../../../logic/getTransaction";

export const getTransaction = async (
  _parent,
  args,
  context
): Promise<Transaction[]> => {
  if (!auth(context.role, Role.Admin)) throw Error("Authorization fails");
  try {
    const data = await get();
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};
