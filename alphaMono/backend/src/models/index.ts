import { Sequelize } from "sequelize";
import client from "./clientModel";
import company from "./companyModel";
import user from "./userModel";
import maintenance from "./maintenanceModel";
import spec from "./specModel";
import data from "./dataModel";
import remote from "./remoteModel";
import memory from "./memoryModel";
import printer from "./printerModel";
import mapping from "./mappingModel";
import credential from "./credentialModel";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./alpha.sqlite",
});
const Client = client(sequelize);
const Company = company(sequelize);
const User = user(sequelize);
const Maintenance = maintenance(sequelize);
const Spec = spec(sequelize);
const Data = data(sequelize);
const Remote = remote(sequelize);
const Memory = memory(sequelize);
const Printer = printer(sequelize);
const Mapping = mapping(sequelize);
const Credential = credential(sequelize);

// intialze associations
Company.hasMany(Client);
Spec.belongsTo(Client);
Data.belongsTo(Client);
Maintenance.hasMany(Data);

Maintenance.belongsTo(Company);
Maintenance.belongsTo(User);
Client.belongsTo(Company);
Company.hasMany(Maintenance);
User.hasMany(Maintenance);
Client.hasMany(Data);
Client.hasOne(Spec);

Spec.hasMany(Memory);
Spec.hasMany(Printer);
Spec.hasMany(Remote);
Spec.hasMany(Mapping);
Spec.hasMany(Credential);

Memory.belongsTo(Spec);
Printer.belongsTo(Spec);
Remote.belongsTo(Spec);
Mapping.belongsTo(Spec);
Credential.belongsTo(Spec);

Client.addHook("afterCreate", async (client) => {
  Spec.create({ ClientId: client.toJSON().id });
});
Maintenance.addHook("afterCreate", async (maintenance) => {
  const clients = await Client.findAll({
    where: {
      CompanyId: maintenance.toJSON().CompanyId,
    },
  });
  for (let client of clients) {
    Data.create({
      ClientId: client.toJSON().id,
      MaintenanceId: maintenance.toJSON().id,
    });
  }
});

sequelize.sync().then((res) => console.log(res));

export {
  Client,
  Company,
  User,
  Maintenance,
  Spec,
  Data,
  Remote,
  Memory,
  Printer,
  Mapping,
  Credential,
};
