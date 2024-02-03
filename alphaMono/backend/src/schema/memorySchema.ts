import { GraphQLError } from "graphql";
import { Memory } from "../models";

const typeDefs = `#graphql
  type Memory {
    id: Int
    name: String
    speed: String
    size: String
    ddr: String
  }

  type Mutation {
    addMemory(SpecClientID: Int!, name: String!, speed: String!, size: String!, ddr: String!): Memory!
    updateMemory(id: Int!, name: String!, speed: String!, size: String!, ddr: String!): Boolean!
  }
`;

const resolvers = {
  Mutation: {
    addMemory: async (_: any, data: any) => {
      try {
        const remote = await Memory.create(data);
        return remote;
      } catch (error) {
        throw new GraphQLError("Error adding memory");
      }
    },
    updateSpec: async (_: any, data: any) => {
      try {
        await Memory.upsert(data);
        return true;
      } catch (error) {
        throw new GraphQLError("Error updating memory");
      }
    },
  },
};

export { typeDefs, resolvers };
