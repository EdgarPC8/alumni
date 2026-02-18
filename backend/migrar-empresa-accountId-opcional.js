/**
 * Migración: permitir accountId nulo en bolsa_empresa.
 * Ejecutar una vez: node migrar-empresa-accountId-opcional.js
 */
import { sequelize } from "./src/database/connection.js";

async function migrate() {
  try {
    console.log("Aplicando sync({ alter: true }) para actualizar accountId a opcional...");
    await sequelize.sync({ alter: true });
    console.log("✅ Migración completada.");
  } catch (err) {
    console.error("Error en migración:", err.message);
  } finally {
    await sequelize.close();
  }
}

migrate();
