import { Sequelize } from "sequelize";
import client from "./clientModel";
import company from "./companyModel";
import user from "./userModel";
import maintenanceModel from "./maintenanceModel";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./alpha.sqlite",
});
const Client = client(sequelize);
const Company = company(sequelize);
const User = user(sequelize);
const Maintenance = maintenanceModel(sequelize);

// intialze associations
Company.hasMany(Client);
Client.belongsTo(Company);

// Maintenance.hasOne(Company);
// Maintenance.hasOne(User);
// Company.belongsTo(Maintenance);
// User.belongsTo(Maintenance);

sequelize.sync().then((res) => console.log(res));

export { Client, Company, User, Maintenance };
