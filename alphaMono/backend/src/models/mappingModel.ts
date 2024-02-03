import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface MappingAttributes {
  id: number;
  name: string;
}

interface MappingCreationAttributes extends Optional<MappingAttributes, "id"> {}

class Mapping
  extends Model<MappingAttributes, MappingCreationAttributes>
  implements MappingAttributes
{
  public id!: number;
  public name!: string;
  public SpecClientID!: number;
}

export default (sequelize: Sequelize) => {
  Mapping.init(
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
      tableName: "Mappings",
    }
  );

  return Mapping;
};
