// import { searchUser } from "../database/connection.js";
import { sequelize } from "../database/connection.js";
import { Users } from "../Models/Users.js";
import bycrypt from "bcrypt";
import { createAccessToken, verifyJWT } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { Roles } from "../Models/Roles.js";
import { UserRoles } from "../Models/UserRoles.js";

// Llamar a la función para agregar un usuario
// agregarUsuario("admin", "contraseña", 1);

const login = async (req, res) => {
  const { username, password, rol } = req.body;

  //Verificar si existe

  // console.log(user);
  try {
    const user = await Users.findOne({
      where: { username },
      include: {
        model: Roles,
        where: { rol },
      },
    });

    const roles = await Users.findOne({
      where: { userId: user.userId },
      include: [
        {
          model: Roles,
          attributes: ["rol"],
        },
      ],
    });

    // console.log(user.roles.rol);
    // const userRol = user.roles.map((role) => role.rol);
    // const passgenerate = await bycrypt.hash("admin", 10);
    // console.log(passgenerate);

    if (!user) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }

    const isCorrectPassword = await bycrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(400).json({ message: "Datos incorrectos" });
    }

    const payload = {
      userId: user.userId,
      userEmail: user.email,
      loginRol: rol,
      firstName: user.firstName,
      secondName: user.secondName,
      firstLastName: user.firstLastName,
      secondLastName: user.secondLastName,
      username: user.username,
      photo: user.photo,
      roles: roles.roles,
      ci: user.ci,
    };

    //Crear token JWT
    const token = await createAccessToken({ payload });

    res.json({ message: "User auth", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const verifytoken = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = await verifyJWT(token);

    res.json(decoded);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { login, verifytoken };
