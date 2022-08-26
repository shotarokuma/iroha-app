import jwt from "jsonwebtoken";

export const context = (context: any) => {
  const token = context.req.headers.authorization || "";
  const accountInfo = jwt.decode(token);
  return accountInfo;
};
