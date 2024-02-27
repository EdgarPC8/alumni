import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

// Definición del modelo Users
export const Tutorials = sequelize.define(
  "tutorials",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
    description: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
  }
);

