import { DataTypes } from "sequelize";
import { sequelize } from "../database/connection.js";
import { Users } from "./Users.js";
import { Account } from "./Account.js";

export const Notifications = sequelize.define("notifications", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  accountId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM("info", "alert", "reminder", "message"),
    defaultValue: "info",
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  link: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING(255),
    allowNull: true,
    comment: "Ruta relativa de imagen para mostrar en la notificación",
  },
  deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  
  seen: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  updatedAt: false,
});

Users.hasMany(Notifications, { foreignKey: "userId", sourceKey: "id", onDelete: "CASCADE" });
Notifications.belongsTo(Users, { foreignKey: "userId", targetKey: "id" });
Account.hasMany(Notifications, { foreignKey: "accountId", sourceKey: "id", onDelete: "CASCADE" });
Notifications.belongsTo(Account, { foreignKey: "accountId", targetKey: "id" });
