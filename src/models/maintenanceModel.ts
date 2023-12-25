import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface MaintenanceAttributes {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MaintenanceCreationAttributes
  extends Optional<MaintenanceAttributes, "id"> {}

class Maintenance
  extends Model<MaintenanceAttributes, MaintenanceCreationAttributes>
  implements MaintenanceAttributes
{
  public id!: number;
}

export default (sequelize: Sequelize) => {
  Maintenance.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      sequelize,
      tableName: "Maintenance",
    }
  );

  return Maintenance;
};
