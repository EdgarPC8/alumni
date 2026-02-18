import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";
import { Account } from "./Account.js";

/**
 * Perfil de empresa - opcionalmente vinculado a Account con rol Empresa.
 * El admin puede crear empresas sin usuario; luego vincularlo si lo desea.
 */
export const Empresa = sequelize.define(
  "bolsa_empresa",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: true,
    },
    razonSocial: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    nit: {
      type: DataTypes.STRING(30),
      defaultValue: null,
    },
    sector: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    descripcion: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    direccion: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    telefono: {
      type: DataTypes.STRING(20),
      defaultValue: null,
    },
    telefonoFijo: {
      type: DataTypes.STRING(20),
      defaultValue: null,
    },
    telefonoMovil: {
      type: DataTypes.STRING(20),
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(120),
      defaultValue: null,
    },
    website: {
      type: DataTypes.STRING(255),
      defaultValue: null,
    },
    logo: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  }
);

// Relación Account - Empresa (1:1)
Account.hasOne(Empresa, { foreignKey: "accountId", onDelete: "CASCADE", as: "empresa" });
Empresa.belongsTo(Account, { foreignKey: "accountId", as: "account" });
