import { Role } from "../../graphql/server";

export const auth = (role: Role, constrain?: Role): boolean => {
  if (constrain === null) return true;
  return role === constrain;
};
