import { Model, DataTypes } from "sequelize";
import { sequelize } from "./connection";

export class Profile extends Model {}
Profile.init(
  {
    fullName: DataTypes.STRING,
    bio: DataTypes.STRING,
    dataURL: DataTypes.STRING,
  },
  { sequelize, modelName: "user" }
);
