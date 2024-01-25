import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs, resolvers } from "./schema";
import { verify } from "jsonwebtoken";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer<Context>(server, {
    listen: {
      host: "0.0.0.0",
      port: 5000,
    },
    context: async ({ req }) => {
      const auth = req.headers.authorization || "";
      const token = auth?.split(" ")[1];
      if (token) {
        const data = verify(token, process.env.JWT_SECRET!) as User;
        return { user: data };
      }
      return { user: null };
    },
  });
  console.log("Listening at: " + url + "graphql");
})();
