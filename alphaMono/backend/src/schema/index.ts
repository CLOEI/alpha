import {
  typeDefs as maintenanceSchema,
  resolvers as maintenanceResolver,
} from "./maintenanceSchema";
import {
  typeDefs as clientSchema,
  resolvers as clientResolver,
} from "./clientSchema";
import {
  typeDefs as companySchema,
  resolvers as companyResolver,
} from "./companySchema";
import {
  typeDefs as userSchema,
  resolvers as userResolver,
} from "./userSchema";
import {
  typeDefs as specSchema,
  resolvers as specResolver,
} from "./specSchema";

const typeDefs = [
  specSchema,
  maintenanceSchema,
  clientSchema,
  companySchema,
  userSchema,
];
const resolvers = {
  Query: {
    ...maintenanceResolver.Query,
    ...specResolver.Query,
    ...clientResolver.Query,
    ...companyResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...maintenanceResolver.Mutation,
    ...specResolver.Mutation,
    ...companyResolver.Mutation,
    ...userResolver.Mutation,
    ...clientResolver.Mutation,
  },
};

export { typeDefs, resolvers };
