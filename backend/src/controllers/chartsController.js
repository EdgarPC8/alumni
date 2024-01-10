import { where } from "sequelize";
import {
  Responses,
} from "../Models/Quiz.js";
import {
  Nominas,
} from "../Models/Nominas.js";

// export const addProfessionalExperience = async (req, res) => {
//   const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
//   try {
//     const newProfessional = await ProfessionalExperience.create(data);
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
//   res.json({ message: "Agregado con éxito" });
// };
// export const editProfessionalExperience = async (req, res) => {
//   const newData = req.body;
//   try {
//     const updatedProfessionalExperience = await ProfessionalExperience.update(
//       newData, // Aquí defines los campos y sus nuevos valores a actualizar
//       req.params.experienceId // Aquí estableces la condición para la actualización
//     );
//     res.json({ message: "Editado con éxito" });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
// export const deleteProfessionalExperience = async (req, res) => {
//   const experienceId = req.params.experienceId;
//   try {
//     const updatedProfessionalExperience = await ProfessionalExperience.destroy({
//       where: {
//         id: experienceId,
//       },
//     });
//     res.json({ message: "Eliminado con Exito" });
//   } catch (error) {
//     res.status(500).json({
//       message: error.message,
//     });
//   }
// };
export const getProfesionalsCareers = async (req, res) => {
  const responses = await Nominas.findAll();
  res.json(responses);
};
