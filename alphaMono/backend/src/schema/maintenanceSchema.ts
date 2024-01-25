import { GraphQLError } from "graphql";
import { Company, Maintenance } from "../models";

const typeDefs = `#graphql
  type Maintenance {
    id: Int!
    type: String!
    CompanyId: Int!
    UserId: Int!
    User: User
    Company: Company!
    createdAt: String!
  }

  type Query {
    maintenances: [Maintenance!]
    maintenance(id: Int!): Maintenance!
  }

  type Mutation {
    addMaintenance(type: String!, CompanyId: Int!): Maintenance!
    deleteMaintenance(id: Int!): Maintenance!
  }
`;

const resolvers = {
  Query: {
    maintenance: async (_: any, { id }: { id: number }) => {
      const maintenance = await Maintenance.findByPk(id, {
        include: [
          "User",
          {
            model: Company,
            include: ["Clients"],
          },
        ],
      });
      return maintenance;
    },
    maintenances: async () => {
      const maintenances = await Maintenance.findAll({
        include: ["User", "Company"],
      });
      return maintenances;
    },
  },
  Mutation: {
    addMaintenance: async (
      _: any,
      { type, CompanyId }: { type: string; CompanyId: number },
      ctx: Context
    ) => {
      if (!ctx.user) throw new GraphQLError("Unauthorized");
      try {
        const maintenance = await Maintenance.create({
          type,
          CompanyId,
          UserId: ctx.user.id,
        });
        return maintenance;
      } catch (error) {
        throw new GraphQLError("Unexpected error occured");
      }
    },
    deleteMaintenance: async (_: any, { id }: { id: number }) => {
      try {
        const maintenance = await Maintenance.findByPk(id);
        if (!maintenance) throw new GraphQLError("Maintenance not found");
        await maintenance.destroy();
        return maintenance;
      } catch (error) {
        throw new GraphQLError("Unexpected error occured");
      }
    },
  },
};

export { typeDefs, resolvers };