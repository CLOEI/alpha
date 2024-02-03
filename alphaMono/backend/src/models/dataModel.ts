import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface DataAttributes {
  id: number;
  MaintenanceId: number;
  ch?: boolean;
  pc?: boolean;
  te?: boolean;
  ufp?: boolean;
  ufcj?: boolean;
  ua?: boolean;
  cmc?: boolean;
  ck?: boolean;
  cm?: boolean;
  sa?: boolean;
  rde?: boolean;
  bd?: boolean;
  dh?: boolean;
  pmp?: boolean;
  sea?: boolean;
  md?: boolean;
  mp?: boolean;
  rc?: boolean;
  sr?: boolean;
  signature?: string;
  ClientId?: number;
}

interface ClientCreationAttributes extends Optional<DataAttributes, "id"> {}

class Data
  extends Model<DataAttributes, ClientCreationAttributes>
  implements DataAttributes
{
  public id!: number;
  public MaintenanceId!: number;
  public ch?: boolean;
  public pc?: boolean;
  public te?: boolean;
  public ufp?: boolean;
  public ufcj?: boolean;
  public ua?: boolean;
  public cmc?: boolean;
  public ck?: boolean;
  public cm?: boolean;
  public sa?: boolean;
  public rde?: boolean;
  public bd?: boolean;
  public dh?: boolean;
  public pmp?: boolean;
  public sea?: boolean;
  public md?: boolean;
  public mp?: boolean;
  public rc?: boolean;
  public sr?: boolean;
  public signature?: string;
  public ClientId?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default (sequelize: Sequelize) => {
  Data.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      MaintenanceId: {
        type: DataTypes.INTEGER,
      },
      ch: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      pc: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      te: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      ufp: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      ufcj: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      ua: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      cmc: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      ck: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      cm: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      sa: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      rde: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      bd: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      dh: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      pmp: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      sea: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      md: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      mp: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      rc: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      sr: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
      },
      signature: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      tableName: "Data",
    }
  );

  return Data;
};
