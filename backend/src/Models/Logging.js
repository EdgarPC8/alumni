import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";

export const Logger = sequelize.define(
  "logger",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    httpMethod: {
      type: DataTypes.STRING(30),
    },
    action: {
      type: DataTypes.STRING(100),
    },
    endPoint: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
  }
);
