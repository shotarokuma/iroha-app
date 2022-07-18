import { create } from "../../logic/createAccount";
import { sendNotificationCreateAccount } from "../../logic/sendEmail";

export const createAccount = async (_parent: any, args: any) => {
  const { first, last } = args.input;
  try {
    await create(first[0] + last);
  } catch (err) {
    console.log(err);
    return false;
  }

  try {
    await sendNotificationCreateAccount();
  } catch (err) {
    console.log(err);
    return false
  }
  return true;
};
