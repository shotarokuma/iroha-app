import { create } from "../../logic/createAccount";

export const createAccount =  async(_parent:any, args:any) => {
  const { first, last } = args.input;
  await create(first[0] + last);
  return true;
};