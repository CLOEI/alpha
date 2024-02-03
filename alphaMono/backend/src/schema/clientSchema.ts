import { GraphQLError } from "graphql";
import { Client, Company, Spec } from "../models";

type Client = {
  id: number;
  name: string;
  phone: string;
  email: string;
  birthday: string;
  role: string;
  companyId: number;
  pcName: string;
  pcPassword: string;
};

type ClientArgs = {
  id: number;
};

const typeDefs = `#graphql
  type Data {
    id: Int!
    ch: Boolean
    pc: Boolean
    te: Boolean
    ufp: Boolean
    ufcj: Boolean
    ua: Boolean
    cmc: Boolean
    ck: Boolean
    cm: Boolean
    sa: Boolean
    rde: Boolean
    bd: Boolean
    dh: Boolean
    pmp: Boolean
    sea: Boolean
    md: Boolean
    mp: Boolean
    rc: Boolean
    sr: Boolean
    signature: String
  }

  type Client {
    id: Int!
    name: String!
    role: String!
    companyId: Int!
    pcName: String!
    localPCPassword: String
    adminPCPassword: String
    phone: String
    email: String
    birthday: String
    Spec: Spec
    Company: Company
    Data: [Data]
  }

  type Query {
    clients: [Client!]
    client(id: Int!): Client!
  }

  type Mutation {
    addClient(name: String!, role: String!, companyId: Int!, pcName: String!, phone: String, email: String, birthday: String): Client!
    removeClient(id: Int!): Boolean
    updateClient(id: Int!, pcName: String, localPCPassword: String, adminPCPassword: String, phone: String, email: String): [Int!]
  }
`;

const resolvers = {
  Query: {
    client: async (_: any, { id }: ClientArgs) => {
      try {
        const client = await Client.findOne({
          where: { id },
          include: [Spec, Company],
        });
        return client;
      } catch (error) {
        console.log(error);
        throw new GraphQLError("Error fetching client");
      }
    },
    clients: () => {},
  },
  Mutation: {
    addClient: async (_: any, data: any) => {
      try {
        const client = await Client.create({
          ...data,
          CompanyId: data.companyId,
        });
        return client;
      } catch (error) {
        throw new GraphQLError("Error adding client");
      }
    },
    removeClient: async (_: any, data: any) => {
      try {
        const client = await Client.destroy({
          where: {
            id: data.id,
          },
        });
        return client;
      } catch (error) {
        throw new GraphQLError("Error removing client");
      }
    },
    updateClient: async (_: any, data: any) => {
      try {
        const client = await Client.update(
          {
            ...data,
          },
          {
            where: {
              id: data.id,
            },
          }
        );
        return client;
      } catch (error) {
        throw new GraphQLError("Error updating client");
      }
    },
  },
};

export { typeDefs, resolvers };
