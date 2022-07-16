import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./resolvers";
import { schema } from "./schema";

const app = express();

const server = new ApolloServer({ schema, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);