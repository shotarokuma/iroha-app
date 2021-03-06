import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./src/resolvers";
import { schema } from "./src/schema";

const app = express();

const server = new ApolloServer({ schema, resolvers });
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);