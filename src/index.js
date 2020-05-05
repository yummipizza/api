import { ApolloServer } from "apollo-server";

import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/importResolvers";

import { AuxiliaryField, Orders, Product, ProductSize } from "./db/controllers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    AuxiliaryField,
    Orders,
    Product,
    ProductSize,
  },
  debug: process.env.NODE_ENV !== "production",
  introspection: true,
  playground: true,
});

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
