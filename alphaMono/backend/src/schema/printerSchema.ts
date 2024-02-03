import { GraphQLError } from "graphql";
import { Printer } from "../models";

const typeDefs = `#graphql
  type Printer {
    id: Int
    name: String
  }

  type Mutation {
    addPrinter(SpecClientID: Int!, name: String!): Printer!
    updatePrinter(id: Int!, name: String!): Boolean!
  }
`;

const resolvers = {
  Mutation: {
    addPrinter: async (_: any, data: any) => {
      try {
        const remote = await Printer.create(data);
        return remote;
      } catch (error) {
        throw new GraphQLError("Error adding printer");
      }
    },
    updatePrinter: async (_: any, data: any) => {
      try {
        await Printer.upsert(data);
        return true;
      } catch (error) {
        throw new GraphQLError("Error updating printer");
      }
    },
  },
};

export { typeDefs, resolvers };
