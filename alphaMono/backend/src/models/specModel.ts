import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface SpecAttributes {
  cpu?: string;
  display?: string;
  ram?: string;
  psu?: string;
  motherboard?: string;
  ClientId?: number;
  hdd?: string;
  ssd?: string;
  dvd?: string;
  case?: string;
  monitor?: string;
  ip?: string;
  mac?: string;
  ups?: string;
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
  public hdd?: string;
  public ssd?: string;
  public dvd?: string;
  public case?: string;
  public monitor?: string;
  public ip?: string;
  public mac?: string;
  public ups?: string;
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
      hdd: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ssd: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dvd: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      case: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      monitor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ip: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mac: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ups: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "Specs",
    }
  );

  return Spec;
};
