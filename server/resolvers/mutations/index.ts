import { Test } from "../../../graphql/server";
import { MutationResolvers } from "../../../graphql/server";

const testMutation = (_parent:any, args:any):Test => {
  return {name:"test2"}
};

export const Mutation:MutationResolvers = {
  testMutation
};