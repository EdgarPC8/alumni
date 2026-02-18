import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";
import { Empresa } from "./Empresa.js";
import { Careers } from "./Alumni.js";

/**
 * Oferta laboral publicada por una empresa
 */
export const OfertaLaboral = sequelize.define(
  "bolsa_oferta_laboral",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empresaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    requisitos: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    modalidad: {
      type: DataTypes.STRING(50),
      defaultValue: "presencial",
    },
    tipoContrato: {
      type: DataTypes.STRING(50),
      defaultValue: "indefinido",
    },
    salarioMin: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: null,
    },
    salarioMax: {
      type: DataTypes.DECIMAL(12, 2),
      defaultValue: null,
    },
    mostrarSalario: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    ubicacion: {
      type: DataTypes.STRING(150),
      defaultValue: null,
    },
    cantidadVacantes: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    estado: {
      type: DataTypes.STRING(30),
      defaultValue: "publicada",
    },
    fechaPublicacion: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    fechaCierre: {
      type: DataTypes.DATEONLY,
      defaultValue: null,
    },
    idCareer: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    timestamps: true,
    underscored: true,
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

Empresa.hasMany(OfertaLaboral, { foreignKey: "empresaId", onDelete: "CASCADE", as: "ofertaLaborals" });
OfertaLaboral.belongsTo(Empresa, { foreignKey: "empresaId", as: "empresa" });

OfertaLaboral.belongsTo(Careers, { foreignKey: "idCareer", targetKey: "idCareer", as: "career" });
Careers.hasMany(OfertaLaboral, { foreignKey: "idCareer" });
