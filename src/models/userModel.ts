import { Sequelize, DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  role: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public role!: string;
  public password!: string;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(12),
        allowNull: false,
      },
      role: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "Users",
    }
  );

  return User;
};
