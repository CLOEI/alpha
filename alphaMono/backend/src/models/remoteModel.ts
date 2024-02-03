import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface RemoteAttributes {
  id: number;
  name: string;
  address: string;
  password: string;
}

interface RemoteCreationAttributes extends Optional<RemoteAttributes, "id"> {}

class Remote
  extends Model<RemoteAttributes, RemoteCreationAttributes>
  implements RemoteAttributes
{
  public id!: number;
  public name!: string;
  public address!: string;
  public password!: string;
  public SpecClientID!: number;
}

export default (sequelize: Sequelize) => {
  Remote.init(
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
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Remotes",
    }
  );

  return Remote;
};
