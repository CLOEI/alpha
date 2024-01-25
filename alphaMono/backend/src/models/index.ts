import { Sequelize } from "sequelize";
import client from "./clientModel";
import company from "./companyModel";
import user from "./userModel";
import maintenanceModel from "./maintenanceModel";
import spec from "./specModel";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./alpha.sqlite",
});
const Client = client(sequelize);
const Company = company(sequelize);
const User = user(sequelize);
const Maintenance = maintenanceModel(sequelize);
const Spec = spec(sequelize);

// intialze associations
Company.hasMany(Client);
Client.belongsTo(Company);
Spec.belongsTo(Client);

Maintenance.belongsTo(Company);
Maintenance.belongsTo(User);
Client.belongsTo(Company);
Company.hasMany(Maintenance);
User.hasMany(Maintenance);
Client.hasOne(Spec);

sequelize.sync().then((res) => console.log(res));

export { Client, Company, User, Maintenance, Spec };
