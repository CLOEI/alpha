import { GraphQLError } from "graphql";
import { Company } from "../models";

const typeDefs = `#graphql
  type Company {
    id: Int!
    name: String!
    owner: String
    streetName: String!
    coordinate: String!
    Clients: [Client!]
  }

  type Query {
    companies: [Company!]
    company(id: Int!): Company!
  }

  type Mutation {
    addCompany(name: String!, streetName: String!, coordinate: String!): Company!
    removeCompany(id: Int!): Int!
    updateCompany(id: Int!, name: String, streetName: String, coordinate: String): [Int!]
  }
`;

const resolvers = {
  Query: {
    company: async (_: any, { id }: { id: number }) => {
      try {
        const company = await Company.findByPk(id, {
          include: ["Clients"],
        });
        return company;
      } catch (error) {
        throw new GraphQLError("Error fetching company");
      }
    },
    companies: async () => {
      try {
        const companies = await Company.findAll({
          include: ["Clients"],
        });
        return companies;
      } catch (error) {
        throw new GraphQLError("Error fetching companies");
      }
    },
  },
  Mutation: {
    addCompany: async (_: any, { name, streetName, coordinate }: any) => {
      try {
        const company = await Company.create({
          name,
          streetName,
          coordinate,
        });
        return company;
      } catch (error) {
        throw new GraphQLError("Error adding company");
      }
    },
    removeCompany: async (_: any, { id }: any) => {
      try {
        const company = await Company.destroy({ where: { id } });
        return company;
      } catch (error) {
        throw new GraphQLError("Error removing company");
      }
    },
    updateCompany: async (
      _: any,
      { id, name, streetName, coordinate }: any
    ) => {
      try {
        const company = await Company.update(
          { name, streetName, coordinate },
          { where: { id } }
        );
        return company;
      } catch (error) {
        console.log(error);
        throw new GraphQLError("Error updating company");
      }
    },
  },
};

export { typeDefs, resolvers };
