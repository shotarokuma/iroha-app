import { addResolveFunctionsToSchema } from "apollo-server-express";
import { buildClientSchema } from "graphql";
import introspection from "../../graphql/graphql.schema.json";

import { resolvers } from "./resolvers";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const schema = buildClientSchema(introspection);

addResolveFunctionsToSchema({ schema, resolvers });
