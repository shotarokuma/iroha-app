import { Resolvers } from "../../graphql/generate/server";
import { Mutation } from './mutations';
import { Query } from './queries';

export const resolvers : Resolvers = {
  Query,
  Mutation,
}