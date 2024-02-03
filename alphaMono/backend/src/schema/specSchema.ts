import { GraphQLError } from "graphql";
import { Memory, Remote, Spec, Credential, Printer, Mapping } from "../models";

const typeDefs = `#graphql
  type Spec {
    cpu: String
    display: String
    psu: String
    motherboard: String
    hdd: String
    ssd: String
    dvd: String
    case: String
    monitor: String
    ip: String
    mac: String
    ups: String
    ClientId: Int
    Remote: Remote
    Memory: Memory
    Credential: Credential
    Printer: Printer
    Mapping: Mapping
  }

  input SpecInput {
    ip: String
    mac: String
    cpu: String
    display: String
    hdd: String
    ssd: String
    dvd: String
    case: String
    monitor: String
    ups: String
    psu: String
    motherboard: String
    ClientId: Int
  }

  type Query {
    spec(ClientId: Int!): Spec
  }

  type Mutation {
    addSpec(data: SpecInput): Spec!
    updateSpec(data: SpecInput): Boolean!
  }
`;

const resolvers = {
  Query: {
    spec: async (_: any, { ClientId }: any) => {
      try {
        const spec = await Spec.findOne({
          where: { ClientId },
          include: [Remote, Memory, Credential, Printer, Mapping],
        });
        return spec;
      } catch (error) {
        throw new GraphQLError("Error fetching spec");
      }
    },
  },
  Mutation: {
    addSpec: async (_: any, { data }: any) => {
      try {
        const spec = await Spec.create(data);
        return spec;
      } catch (error) {
        throw new GraphQLError("Error adding spec");
      }
    },
    updateSpec: async (_: any, { data }: any) => {
      try {
        await Spec.upsert(data);
        return true;
      } catch (error) {
        throw new GraphQLError("Error updating spec");
      }
    },
  },
};

export { typeDefs, resolvers };
