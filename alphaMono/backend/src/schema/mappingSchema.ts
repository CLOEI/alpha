import { GraphQLError } from "graphql";
import { Mapping } from "../models";

const typeDefs = `#graphql
  type Mapping {
    id: Int
    name: String
  }

  type Mutation {
    addMapping(SpecClientID: Int!, name: String!): Mapping!
    updateMapping(id: Int!, name: String!): Boolean!
  }
`;

const resolvers = {
  Mutation: {
    addMapping: async (_: any, data: any) => {
      try {
        const remote = await Mapping.create(data);
        return remote;
      } catch (error) {
        throw new GraphQLError("Error adding mapping");
      }
    },
    updateMapping: async (_: any, data: any) => {
      try {
        await Mapping.upsert(data);
        return true;
      } catch (error) {
        throw new GraphQLError("Error updating mapping");
      }
    },
  },
};

export { typeDefs, resolvers };
