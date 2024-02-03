import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface PrinterAttributes {
  id: number;
  name: string;
}

interface PrinterCreationAttributes extends Optional<PrinterAttributes, "id"> {}

class Printer
  extends Model<PrinterAttributes, PrinterCreationAttributes>
  implements PrinterAttributes
{
  public id!: number;
  public name!: string;
  public SpecClientID!: number;
}

export default (sequelize: Sequelize) => {
  Printer.init(
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
    },
    {
      sequelize,
      tableName: "Printers",
    }
  );

  return Printer;
};
