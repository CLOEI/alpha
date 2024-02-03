import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import { Spec } from ".";

interface CredentialAttributes {
  id: number;
  name: string;
}

interface CredentialCreationAttributes
  extends Optional<CredentialAttributes, "id"> {}

class Credential
  extends Model<CredentialAttributes, CredentialCreationAttributes>
  implements CredentialAttributes
{
  public id!: number;
  public name!: string;
}

export default (sequelize: Sequelize) => {
  Credential.init(
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
      tableName: "Credentials",
    }
  );

  return Credential;
};
