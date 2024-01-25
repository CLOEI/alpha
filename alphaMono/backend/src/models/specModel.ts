import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface SpecAttributes {
  cpu?: string;
  display?: string;
  ram?: string;
  psu?: string;
  motherboard?: string;
  ClientId?: number;
}

interface SpecCreationAttributes extends Optional<SpecAttributes, "ClientId"> {}

class Spec
  extends Model<SpecAttributes, SpecCreationAttributes>
  implements SpecAttributes
{
  public cpu?: string;
  public display?: string;
  public ram?: string;
  public psu?: string;
  public motherboard?: string;
  public ClientId!: number;
}

export default (sequelize: Sequelize) => {
  Spec.init(
    {
      cpu: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      display: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ram: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      psu: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      motherboard: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ClientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Specs",
    }
  );

  return Spec;
};
