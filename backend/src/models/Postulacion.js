import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";
import { OfertaLaboral } from "./OfertaLaboral.js";
import { Users } from "./Users.js";
import { Professionals } from "./CV.js";

/**
 * Postulación de un graduado/egresado a una oferta laboral
 */
export const Postulacion = sequelize.define(
  "bolsa_postulacion",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    ofertaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    professionalId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mensajePresentacion: {
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    estado: {
      type: DataTypes.STRING(30),
      defaultValue: "postulado",
    },
    notasEmpresa: {
      type: DataTypes.TEXT,
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

OfertaLaboral.hasMany(Postulacion, { foreignKey: "ofertaId", onDelete: "CASCADE", as: "postulacions" });
Postulacion.belongsTo(OfertaLaboral, { foreignKey: "ofertaId", as: "ofertaLaboral" });

Users.hasMany(Postulacion, { foreignKey: "userId", onDelete: "CASCADE" });
Postulacion.belongsTo(Users, { foreignKey: "userId", as: "user" });

Professionals.hasMany(Postulacion, { foreignKey: "professionalId", onDelete: "CASCADE" });
Postulacion.belongsTo(Professionals, { foreignKey: "professionalId", as: "professional" });
