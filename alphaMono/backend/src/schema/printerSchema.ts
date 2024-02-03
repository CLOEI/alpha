import { GraphQLError } from "graphql";
import { Printer, Spec } from "../models";

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
        const spec = await Spec.findByPk(data.SpecClientID);
        if (!spec) throw new GraphQLError("Spec not found");
        const remote = await Printer.create(data);
        await (spec as any).addPrinter(remote);
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
