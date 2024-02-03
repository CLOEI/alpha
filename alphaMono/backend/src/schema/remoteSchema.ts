import { GraphQLError } from "graphql";
import { Remote, Spec } from "../models";

const typeDefs = `#graphql
  type Remote {
    id: Int
    name: String
    address: String
    password: String
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
        const spec = await Spec.findByPk(data.SpecClientID);
        if (!spec) throw new GraphQLError("Spec not found");
        const remote = await Remote.create({
          name: data.name,
          address: data.address,
          password: data.password,
        });
        await (spec as any).addRemote(remote);
        return remote;
      } catch (error) {
        throw new GraphQLError("Error adding remote");
      }
    },
    updateRemote: async (_: any, data: any) => {
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
