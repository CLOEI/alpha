import { GraphQLError } from "graphql";
import { Data } from "../models";

interface IData {
  id: number;
  pc: boolean;
  te: boolean;
  ch: boolean;
  ufp: boolean;
  ufcj: boolean;
  ua: boolean;
  cmc: boolean;
  ck: boolean;
  cm: boolean;
  sa: boolean;
  rde: boolean;
  dh: boolean;
  bd: boolean;
  pmp: boolean;
  sea: boolean;
  md: boolean;
  mp: boolean;
  rc: boolean;
  sr: boolean;
  MaintenanceId: number;
  ClientId: number;
  signature: string;
}

const typeDefs = `#graphql
  type Data {
    id: Int!
    MaintenanceId: Int
    pc: Boolean
    te: Boolean
    ch: Boolean
    ufp: Boolean
    ufcj: Boolean
    ua: Boolean
    cmc: Boolean
    ck: Boolean
    cm: Boolean
    sa: Boolean
    rde: Boolean
    dh: Boolean
    bd: Boolean
    pmp: Boolean
    sea: Boolean
    md: Boolean
    mp: Boolean
    rc: Boolean
    sr: Boolean
    ClientId: Int
    signature: String
  }

  input IData {
    id: Int
    pc: Boolean
    te: Boolean
    ch: Boolean
    ufp: Boolean
    ufcj: Boolean
    ua: Boolean
    cmc: Boolean
    ck: Boolean
    cm: Boolean
    sa: Boolean
    rde: Boolean
    dh: Boolean
    bd: Boolean
    pmp: Boolean
    sea: Boolean
    md: Boolean
    mp: Boolean
    rc: Boolean
    sr: Boolean
    ClientId: Int
    MaintenanceId: Int
    signature: String
  }

  type Query {
    datas: [Data!]
    data(id: Int!): Data!
  }

  type Mutation {
    addData(data: IData): Data!
    updateData(data: IData): Boolean!
  }
`;

const resolvers = {
  Query: {
    data: async (_: any, { id }: { id: number }) => {
      try {
        const data = await Data.findByPk(id);
        return data;
      } catch (error) {
        throw new GraphQLError("Error fetching data");
      }
    },
    datas: async () => {
      try {
        const datas = await Data.findAll();
        return datas;
      } catch (error) {
        throw new GraphQLError("Error fetching datas");
      }
    },
  },
  Mutation: {
    addData: async (_: any, data: IData) => {
      try {
        const x = await Data.create(data);
        return x;
      } catch (error) {
        throw new GraphQLError("Error adding Data");
      }
    },
    updateData: async (_: any, { data }: { data: IData }) => {
      try {
        await Data.upsert(data);
        return true;
      } catch (error) {
        throw new GraphQLError("Error updating data");
      }
    },
  },
};

export { typeDefs, resolvers };
