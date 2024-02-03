import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface MemoryAttributes {
  id: number;
  name: string;
  speed: string;
  size: string;
  ddr: string;
}

interface MemoryCreationAttributes extends Optional<MemoryAttributes, "id"> {}

class Memory
  extends Model<MemoryAttributes, MemoryCreationAttributes>
  implements MemoryAttributes
{
  public id!: number;
  public name!: string;
  public speed!: string;
  public size!: string;
  public ddr!: string;
  public SpecClientID!: number;
}

export default (sequelize: Sequelize) => {
  Memory.init(
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
      speed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      size: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ddr: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Memories",
    }
  );

  return Memory;
};
