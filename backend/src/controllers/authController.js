// import { searchUser } from "../database/connection.js";
import { sequelize } from "../database/connection.js";
import { Users } from "../Models/Users.js";
import bycrypt from "bcrypt";
import { createAccessToken, getHeaderToken, verifyJWT } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { Roles } from "../Models/Roles.js";
import { UserRoles } from "../Models/UserRoles.js";
import { logger } from "../log/LogActivity.js";


// Llamar a la función para agregar un usuario
// agregarUsuario("admin", "contraseña", 1);

const login = async (req, res) => {
  const { username, password, rol } = req.body;
  const system=req.headers['user-agent'];

  try {
    const user = await Users.findOne({
      where: { username },
      include: {
        model: Roles,
        where: { rol },
      },
    });
    // console.log(user);

    const roles = await Users.findOne({
      where: { userId: user.userId },
      include: [
        {
          model: Roles,
          attributes: ["rol"],
        },
      ],
    });

    // console.log(user);
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
      loginRol: rol,
      username: user.username,
    };

    //Crear token JWT
    const token = await createAccessToken({ payload });

    logger({
      httpMethod: req.method,
      endPoint: req.originalUrl,
      action: "Se a Logeado",
      description: `EL ${rol} ${user.firstName} ${user.secondName} ${user.firstLastName} ${user.secondLastName} con CI: ${user.ci}`,
      system:system
    });



    res.json({ message: "User auth", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const verifytoken = async (req, res) => {
  const token = getHeaderToken(req);

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = await verifyJWT(token);

    res.json(decoded);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { login, verifytoken };
