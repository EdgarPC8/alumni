import { sequelize } from "../database/connection.js";
import { Roles } from "./Roles.js";
import { DataTypes } from "sequelize";
import { UserRoles } from "./UserRoles.js";
import { Professionals } from "./Professionals.js";
// import { UserData } from "./UserData.js";
import { CompanyData } from "./CompanyData.js";

// Definición del modelo Users
export const Users = sequelize.define(
  "users",
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING(30),
    },
    password: {
      type: DataTypes.STRING(100),
    },
    ci: {
      type: DataTypes.BIGINT,
    },
    firstName: {
      type: DataTypes.STRING(30),
    },
    secondName: {
      type: DataTypes.STRING(30),
    },
    firstLastName: {
      type: DataTypes.STRING(30),
    },
    secondLastName: {
      type: DataTypes.STRING(30),
    },
    photo: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamps: false,
  }
);
// Relacion muchos a muchos, tabla intermedia user_roles

Users.belongsToMany(Roles, {
  through: UserRoles,
  foreignKey: "userId",
  sourceKey: "userId",
});
Roles.belongsToMany(Users, {
  through: UserRoles,
  foreignKey: "roleId",
  sourceKey: "id",
});

Users.hasOne(CompanyData, { foreignKey: "userId", sourceKey: "userId" });
CompanyData.belongsTo(Users, { foreignKey: "userId", sourceKey: "userId" });

Users.hasOne(Professionals, { foreignKey: "userId", sourceKey: "userId" });
Professionals.belongsTo(Users, { foreignKey: "userId", sourceKey: "userId" });
