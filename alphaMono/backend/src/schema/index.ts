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
import {
  typeDefs as dataSchema,
  resolvers as dataResolver,
} from "./dataSchema";
import {
  typeDefs as remoteSchema,
  resolvers as remoteResolver,
} from "./remoteSchema";
import {
  typeDefs as memorySchema,
  resolvers as memoryResolver,
} from "./memorySchema";
import {
  typeDefs as credentialSchema,
  resolvers as credentialResolver,
} from "./credentialSchema";
import {
  typeDefs as printerSchema,
  resolvers as printerResolver,
} from "./printerSchema";
import {
  typeDefs as mappingSchema,
  resolvers as mappingResolver,
} from "./mappingSchema";

const typeDefs = [
  specSchema,
  maintenanceSchema,
  clientSchema,
  companySchema,
  userSchema,
  dataSchema,
  remoteSchema,
  memorySchema,
  credentialSchema,
  printerSchema,
  mappingSchema,
];
const resolvers = {
  Query: {
    ...maintenanceResolver.Query,
    ...specResolver.Query,
    ...clientResolver.Query,
    ...companyResolver.Query,
    ...userResolver.Query,
    ...dataResolver.Query,
  },
  Mutation: {
    ...maintenanceResolver.Mutation,
    ...specResolver.Mutation,
    ...companyResolver.Mutation,
    ...userResolver.Mutation,
    ...clientResolver.Mutation,
    // ...dataResolver.Mutation,
    // ...remoteResolver.Mutation,
    // ...memoryResolver.Mutation,
    // ...credentialResolver.Mutation,
    // ...printerResolver.Mutation,
    // ...mappingResolver.Mutation,
  },
};

export { typeDefs, resolvers };
