import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

// Definición del modelo Users
export const CompanyData = sequelize.define(
  "companyData",
  {
    idCompanyData: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(30),
    },
  },
  {
    timestamps: false,
  }
);

