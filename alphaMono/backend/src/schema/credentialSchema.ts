import { GraphQLError } from "graphql";
import { Credential, Spec } from "../models";

const typeDefs = `#graphql
  type Credential {
    id: Int
    name: String
  }

  type Mutation {
    addCredential(SpecClientID: Int!, name: String!): Credential!
    updateCredential(id: Int!, name: String!): Boolean!
  }
`;

const resolvers = {
  Mutation: {
    addCredential: async (_: any, data: any) => {
      try {
        const spec = await Spec.findByPk(data.SpecClientID);
        if (!spec) throw new GraphQLError("Spec not found");

        const cred = await Credential.create({
          name: data.name,
        });
        await (spec as any).addCredential(cred);
        return cred;
      } catch (error) {
        throw new GraphQLError("Error adding credentials");
      }
    },
    updateCredential: async (_: any, data: any) => {
      try {
        await Credential.upsert(data);
        return true;
      } catch (error) {
        throw new GraphQLError("Error updating memory");
      }
    },
  },
};

export { typeDefs, resolvers };
