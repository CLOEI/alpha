import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface MaintenanceAttributes {
  id: number;
  type: string;
  CompanyId: number;
  UserId: number;
}

interface MaintenanceCreationAttributes
  extends Optional<MaintenanceAttributes, "id"> {}

class Maintenance
  extends Model<MaintenanceAttributes, MaintenanceCreationAttributes>
  implements MaintenanceAttributes
{
  public id!: number;
  public type!: string;
  public CompanyId!: number;
  public UserId!: number;
}

export default (sequelize: Sequelize) => {
  Maintenance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      CompanyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Maintenance",
    }
  );

  return Maintenance;
};
