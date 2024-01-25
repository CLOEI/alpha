import { compare, hash } from "bcrypt";
import { Maintenance, User } from "../models";
import { sign, verify } from "jsonwebtoken";
import { GraphQLError } from "graphql";

type UserLogin = {
  username: string;
  password: string;
};

const typeDefs = `#graphql
  type User {
    id: Int!
    username: String!
    password: String!
    role: String!
    Maintenances: [Maintenance!]
    createdAt: String!
  }

  type Query {
    users: [User!]
    user(id: Int!): User
    verified: Boolean!
  }

  type Mutation {
    addUser(username: String!, password: String!, role: String!): User!
    removeUser(id: Int!): User!
    login(username: String!, password: String!): String!
  }
`;

const resolvers = {
  Query: {
    user: async (_: any, { id }: { id: number }) => {
      const user = await User.findByPk(id, {
        include: ["Maintenance"],
      });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "USER_NOT_FOUND",
          },
        });
      }
      return user;
    },
    users: async () => {
      try {
        const users = await User.findAll({
          include: [
            {
              model: Maintenance,
              include: ["Company"],
            },
          ],
        });
        return users;
      } catch (error) {
        throw new GraphQLError("Unexpected error occured");
      }
    },
    verified: async (_: any, x: any, ctx: Context) => {
      if (ctx.user) {
        return true;
      }
      return false;
    },
  },
  Mutation: {
    addUser: async (
      _: any,
      {
        username,
        password,
        role,
      }: { username: string; password: string; role: string }
    ) => {
      try {
        const hashedPassword = await hash(password, 10);
        const user = await User.create({
          username,
          password: hashedPassword,
          role,
        });
        return user;
      } catch (error) {
        throw new GraphQLError("Unexpected error occured");
      }
    },
    removeUser: async (_: any, { id }: { id: number }) => {
      try {
        const user = await User.findByPk(id);
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: {
              code: "USER_NOT_FOUND",
            },
          });
        }
        await user.destroy();
        return user;
      } catch (error) {
        throw new GraphQLError("Unexpected error occured");
      }
    },
    login: async (_: any, { username, password }: UserLogin) => {
      try {
        const user = await User.findOne({
          where: { username },
        });

        if (user) {
          const valid = await compare(password, user.password);
          if (!valid) {
            throw new GraphQLError("Invalid password", {
              extensions: {
                code: "INVALID_PASSWORD",
              },
            });
          }

          const token = sign(
            { id: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET!,
            {
              expiresIn: "24h",
            }
          );

          return token;
        } else {
          throw new GraphQLError("User not found", {
            extensions: {
              code: "USER_NOT_FOUND",
            },
          });
        }
      } catch (error: any) {
        switch (error.extensions.code) {
          case "INVALID_PASSWORD":
            throw new GraphQLError("Invalid password");
          case "USER_NOT_FOUND":
            throw new GraphQLError("User not found");
          default:
            throw new GraphQLError("Unexpected error occured");
        }
      }
    },
  },
};

export { typeDefs, resolvers };
