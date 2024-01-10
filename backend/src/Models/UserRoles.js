import { sequelize } from "../database/connection.js";
import { DataTypes } from "sequelize";


const UserRoles = sequelize.define("user_roles", {
  
   
}, { timestamps: false });

export { UserRoles };
