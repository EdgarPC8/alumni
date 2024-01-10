import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";
// Cedula	Nombres	Cod de registro	Fecha de acta	Pais	Lugar	Modalidad	Tipo de formacion	Titulo	Carrera	Intitucion	Fecha de emision	Nomina

export const Nominas = sequelize.define(
  "nominas",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ci: {
      type: DataTypes.BIGINT(11),
      allowNull: false, // No permite valores nulos
      unique: true, // Hace que el campo sea único
    },
    profesional: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    gender: {
      type: DataTypes.STRING(5),
      defaultValue: null,
    },
    registerCod: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    dateRecord: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    country: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    place: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    modality: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    typeTraining: {
      type: DataTypes.STRING(50),
      defaultValue: null,
    },
    title: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    career: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    institution: {
      type: DataTypes.STRING(100),
      defaultValue: null,
    },
    dateIssue: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    nomina: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
  },
  {
    timestamps: false,
  }
);
