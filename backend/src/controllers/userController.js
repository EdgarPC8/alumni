import { Roles } from "../Models/Roles.js";
import { Users } from "../Models/Users.js";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRoles } from "../Models/UserRoles.js";
import { Op } from "sequelize";
import { Professionals } from "../Models/Professionals.js";


const addUser = async (req, res) => {
  try {
   
    const {
      ci,
      username,
      firstName,
      secondName,
      firstLastName,
      secondLastName,
      password,
      roles,
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
      return res.status(400).json({ message: `CI: ${ci} ya registrado` });
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

    res.json({ message: `${firstName} ${firstLastName} agregado con éxito`,user:newUser});

    const userRoles = roles.map((roleId) => {
      return { userId: newUser.userId, roleId };
    });

    // console.log(userRoles);

    await UserRoles.bulkCreate(userRoles);
  } catch (error) {
    // manejo de errores si ocurre algún problema durante la creación del usuario
    console.error("error al crear el usuario:", error);
  }
};

const getRoles = async (req, res) => {
  try {
    const roles = await Roles.findAll();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getOneUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findOne({
      attributes: [
        "userId",
        "firstName",
        "secondName",
        "username",
        "ci",
        "firstLastName",
        "secondLastName",
        "photo",
      ],
      where: { userId },
      include: [
        {
          model: Roles,
          attributes: ["rol"],
        },
      ],
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

    const data = {
      userId: user.userId,
      userEmail: user.email,
      firstName: user.firstName,
      secondName: user.secondName,
      firstLastName: user.firstLastName,
      secondLastName: user.secondLastName,
      username: user.username,
      photo: user.photo,
      roles: roles.roles,
      ci: user.ci,
    };

    res.json(data);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserData = async (req, res) => {
  const {
    ci,
    firstName,
    username,
    secondName,
    firstLastName,
    secondLastName,
    roles,
  } = req.body;

  // console.log(req.body);

  try {
    const userUpdate = await Users.update(
      {
        ci,
        username,
        firstName,
        secondName,
        firstLastName,
        secondLastName,
      },
      {
        where: {
          userId: req.params.userId,
        },
      }
    );

    if (roles.length) {
      const findUserRoles = await UserRoles.findAll({
        where: {
          userId: req.params.userId,
        },
      });

      const rolesToAdd = roles.filter(
        (rolId) => !findUserRoles.some((rol) => rol.roleId.toString() === rolId)
      );

      const rolesToDelete = findUserRoles.filter(
        (rol) => !roles.includes(rol.roleId.toString())
      );

      if (rolesToDelete.length) {
        rolesToDelete.forEach((rol) => {
          UserRoles.destroy({
            where: {
              userId: req.params.userId,
              roleId: rol.roleId,
            },
          });
        });
      }

      if (rolesToAdd.length) {
        const rolesToAddBulk = rolesToAdd.map((roleId) => ({
          userId: req.params.userId,
          roleId: roleId,
        }));

        await UserRoles.bulkCreate(rolesToAddBulk);
      }
    }

    res.json({ message: "usuario editado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUserProfile = async (req, res) => {
  const { ci, firstName, username, secondName, firstLastName, secondLastName } =
    req.body;

  try {
    const userUpdate = await Users.update(
      {
        ci,
        username,
        firstName,
        secondName,
        firstLastName,
        secondLastName,
      },
      {
        where: {
          userId: req.params.userId,
        },
      }
    );

    res.json({ message: "usuario editado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  try {
    const user = await Users.findOne({
      attributes: ["password"],
      where: { userId: req.params.userId },
    });

    const isCorrectPassword = await bycrypt.compare(
      currentPassword,
      user.password
    );

    if (!isCorrectPassword) {
      throw new Error("La contraseña actual proporcianda no es válida");
    }

    const passgenerate = await bycrypt.hash(newPassword, 10);

    const newPass = await Users.update(
      { password: passgenerate },
      { where: { userId: req.params.userId } }
    );
    res.json({ message: "Contraseña actualizada con éxito" });
  } catch (e) {
    return res.status(400).json({
      error: "Bad Request",
      message: e.message,
    });
  }
};

const getUsers = async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];
  const decoded = jwt.verify(token, "privateKey");
  // console.log(decoded);

  try {
    const users = await Users.findAll({
      attributes: [
        "userId",
        "username",
        "ci",
        "firstName",
        "secondName",
        "firstLastName",
        "secondLastName",
        "photo",
      ],
    });
    res.json(users);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const removingUser = await Users.destroy({
      where: {
        userId: req.params.userId,
      },
    });

    res.json({ message: "Usuario eleminado con éxito" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export {
  addUser,
  getRoles,
  getOneUser,
  updateUserProfile,
  updateUserData,
  changePassword,
  deleteUser,
  getUsers,
};
