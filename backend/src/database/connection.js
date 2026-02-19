 import Sequelize from "sequelize";

const sequelize = new Sequelize("graduates", "root", "", {
  host: "localhost",
  dialect: "mysql",
  timezone: '-05:00', // ✅ ajusta al horario local
});

export { sequelize }; 



/* import { Sequelize } from "sequelize"
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.db",   // ← aquí se crea el archivo .db
  logging: false,
}); */
