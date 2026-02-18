// Controlador para todo lo que viene del sistema SMISTMS (GAISTMS): login externo / SSO.
// Verifica si el usuario existe en Alumni; si no, crea cuenta y usuario, luego devuelve token.

import { Users } from "../models/Users.js";
import { Account, AccountRoles } from "../models/Account.js";
import { Roles } from "../models/Roles.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import crypto from "crypto";

/**
 * POST body esperado (desde PHP / front que recibe postMessage):
 * - ci (número documento / cédula)
 * - id_estudiante (opcional, para referencia)
 * - firstName, secondName, firstLastName, secondLastName
 * - urlWeb (opcional)
 */
export const loginSmistms = async (req, res) => {
  try {
    const {
      ci,
      id_estudiante,
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      urlWeb,
    } = req.body;

    if (!ci || !firstName || !firstLastName) {
      return res.status(400).json({
        message: "Faltan datos requeridos: ci, firstName, firstLastName",
      });
    }

    const studentRole = await Roles.findOne({ where: { name: "Estudiante" } });
    if (!studentRole) {
      return res.status(500).json({ message: "Rol Estudiante no configurado" });
    }

    let user = await Users.findOne({ where: { ci: String(ci).trim() } });

    if (!user) {
      const passwordPlain = crypto.randomBytes(24).toString("hex");
      const hashedPassword = await bcrypt.hash(passwordPlain, 10);

      user = await Users.create({
        ci: String(ci).trim(),
        firstName: firstName || "",
        secondName: secondName || "",
        firstLastName: firstLastName || "",
        secondLastName: secondLastName || "",
      });

      const newAccount = await Account.create({
        username: String(ci).trim(),
        password: hashedPassword,
        userId: user.id,
      });

      await AccountRoles.create({
        accountId: newAccount.id,
        roleId: studentRole.id,
      });

      const payload = {
        userId: user.id,
        accountId: newAccount.id,
        rolId: studentRole.id,
        loginRol: studentRole.name,
      };
      const token = await createAccessToken({ payload });
      return res.json({ message: "Usuario creado y autenticado", token });
    }

    const account = await Account.findOne({
      where: { userId: user.id },
      include: [
        { model: Roles, as: "roles", through: { attributes: [] } },
      ],
    });

    if (!account) {
      const passwordPlain = crypto.randomBytes(24).toString("hex");
      const hashedPassword = await bcrypt.hash(passwordPlain, 10);
      const newAccount = await Account.create({
        username: String(ci).trim(),
        password: hashedPassword,
        userId: user.id,
      });
      await AccountRoles.create({
        accountId: newAccount.id,
        roleId: studentRole.id,
      });

      const payload = {
        userId: user.id,
        accountId: newAccount.id,
        rolId: studentRole.id,
        loginRol: studentRole.name,
      };
      const token = await createAccessToken({ payload });
      return res.json({ message: "Usuario creado y autenticado", token });
    }

    const roleEstudiante = account.roles.find((r) => r.name === "Estudiante");
    const rolId = roleEstudiante ? roleEstudiante.id : studentRole.id;
    const loginRol = roleEstudiante ? roleEstudiante.name : studentRole.name;

    const payload = {
      userId: account.userId,
      accountId: account.id,
      rolId,
      loginRol,
    };
    const token = await createAccessToken({ payload });
    res.json({ message: "User authenticated", token });
  } catch (error) {
    console.error("Error loginSmistms:", error);
    res.status(500).json({ message: error.message });
  }
};
