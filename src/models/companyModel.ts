import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface CompanyAttributes {
  id: number;
  name: string;
  streetName: string;
  coordinate: string;
}

interface CompanyCreationAttributes extends Optional<CompanyAttributes, "id"> {}

class Company
  extends Model<CompanyAttributes, CompanyCreationAttributes>
  implements CompanyAttributes
{
  public id!: number;
  public name!: string;
  public streetName!: string;
  public coordinate!: string;
}

export default (sequelize: Sequelize) => {
  Company.init(
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
      streetName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      coordinate: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Company",
    }
  );

  return Company;
};
