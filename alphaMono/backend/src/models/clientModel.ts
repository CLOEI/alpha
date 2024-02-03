import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface ClientAttributes {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  birthday?: string;
  role: string;
  pcName: string;
  localPCPassword?: string;
  adminPCPassword?: string;
}

interface ClientCreationAttributes extends Optional<ClientAttributes, "id"> {}

class Client
  extends Model<ClientAttributes, ClientCreationAttributes>
  implements ClientAttributes
{
  public id!: number;
  public name!: string;
  public phone?: string;
  public email?: string;
  public birthday?: string;
  public role!: string;
  public pcName!: string;
  public localPCPassword?: string;
  public adminPCPassword?: string;
}

export default (sequelize: Sequelize) => {
  Client.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      birthday: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pcName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      localPCPassword: {
        type: DataTypes.STRING,
      },
      adminPCPassword: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "Clients",
    }
  );

  return Client;
};
