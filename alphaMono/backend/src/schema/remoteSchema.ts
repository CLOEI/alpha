import { GraphQLError } from "graphql";
import { Remote } from "../models";

const typeDefs = `#graphql
  type Remote {
    id: Int
    name: String
    address: String
    password: String
    SpecClientId: Int
  }

  type Mutation {
    addRemote(SpecClientID: Int!, name: String!, address: String!, password: String!): Remote!
    updateRemote(id: Int!, name: String!, address: String!, password: String!): Boolean!
  }
`;

const resolvers = {
  Mutation: {
    addRemote: async (_: any, data: any) => {
      try {
        const remote = await Remote.create(data);
        return remote;
      } catch (error) {
        throw new GraphQLError("Error adding remote");
      }
    },
    updateSpec: async (_: any, data: any) => {
      try {
        await Remote.upsert(data);
        return true;
      } catch (error) {
        throw new GraphQLError("Error updating remote");
      }
    },
  },
};

export { typeDefs, resolvers };
