import { Test } from "../../../../graphql/server";
import { QueryResolvers } from "../../../../graphql/server";
import { getAsset } from "./getAsset";

const testQuery = (_parent:any, args:any):Test => {
  return {name:"test2"}
};

export const Query:QueryResolvers = {
  testQuery,
  getAsset
};