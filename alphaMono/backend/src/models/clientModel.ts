import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface ClientAttributes {
  id: number;
  name: string;
  phone?: string;
  email?: string;
  birthday?: string;
  role: string;
  pcName: string;
  pcPassword?: string;
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
  public pcPassword?: string;
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
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(24),
      },
      email: {
        type: DataTypes.STRING(24),
      },
      birthday: {
        type: DataTypes.STRING(12),
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      pcName: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      pcPassword: {
        type: DataTypes.STRING(12),
      },
    },
    {
      sequelize,
      tableName: "Clients",
    }
  );

  return Client;
};
