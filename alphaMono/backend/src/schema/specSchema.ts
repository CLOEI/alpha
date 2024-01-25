import { GraphQLError } from "graphql";
import { Spec } from "../models";

const typeDefs = `#graphql
  type Spec {
    cpu: String
    display: String
    ram: String
    psu: String
    motherboard: String
    ClientId: Int
  }

  type Query {
    spec(ClientId: Int!): Spec
  }

  type Mutation {
    addSpec(clientId: Int!, cpu: String, display: String, ram: String, psu: String, motherboard: String): Spec!
    updateSpec(clientId: Int!, cpu: String, display: String, ram: String, psu: String, motherboard: String): Boolean!
  }
`;

const resolvers = {
  Query: {
    spec: async (_: any, { ClientId }: any) => {
      try {
        const spec = await Spec.findOne({ where: { ClientId } });
        return spec;
      } catch (error) {
        throw new GraphQLError("Error fetching spec");
      }
    },
  },
  Mutation: {
    addSpec: async (
      _: any,
      { ClientId, cpu, display, ram, psu, motherboard }: any
    ) => {
      try {
        const spec = await Spec.create({
          ClientId,
          cpu,
          display,
          ram,
          psu,
          motherboard,
        });
        return spec;
      } catch (error) {
        throw new GraphQLError("Error adding spec");
      }
    },
    updateSpec: async (
      _: any,
      { clientId, cpu, display, ram, psu, motherboard }: any
    ) => {
      try {
        await Spec.upsert({
          ClientId: clientId,
          cpu,
          display,
          ram,
          psu,
          motherboard,
        });

        return true;
      } catch (error) {
        throw new GraphQLError("Error updating spec");
      }
    },
  },
};

export { typeDefs, resolvers };
