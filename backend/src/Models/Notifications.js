import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";

export const Notifications = sequelize.define(
  "notifications",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false, // El título de la notificación es obligatorio
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false, // El mensaje de la notificación es obligatorio
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Se establece la fecha y hora de creación por defecto
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Indica si la notificación ha sido leída o no
    },
  },
  {
    timestamps: false, // No se agregan automáticamente campos de createdAt y updatedAt
  }
);
