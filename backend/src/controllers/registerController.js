import { Users } from "../Models/Users.js";
import bycrypt from "bcrypt";
import { Op } from "sequelize";
import { logger } from "../log/LogActivity.js";
import { UserRoles } from "../Models/UserRoles.js";

export const registerUser = async (req, res) => {
  try {
    const {
      ci,
      username,
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      password,
    } = req.body;

    // Verificar si el nombre de usuario o CI ya existe
    const existingUser = await Users.findOne({
      where: {
        [Op.or]: [
          { username },
          { ci },
        ],
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Nombre de usuario o CI ya registrado" });
    }

    const passgenerate = await bycrypt.hash(password, 10);

    const photo = req.file ? req.file.filename : null;

    const newUser = await Users.create({
      ci,
      username,
      firstName,
      secondName,
      firstLastName,
      password: passgenerate,
      secondLastName,
      photo,
    });

    // rol por defecto "profesional" cuando se registre un usuario
    const rol = await UserRoles.create({ userId: newUser.userId, roleId: 2 });

    logger({
      httpMethod: req.method,
      endPoint: req.originalUrl,
      action: "Usuario registrado",
    });

    res.json({
      message: "Usuario registrado con éxito",
      user: {
        userId: newUser.userId,
        username: newUser.username,
        // Otros campos que puedas querer incluir en la respuesta
      },
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ message: "Error al crear el usuario" });
  }
};
