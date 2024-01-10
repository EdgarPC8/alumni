import {
  Questions,
  Options,
  Responses,
  QuestionTypes,
  Quiz,
} from "../Models/Quiz.js";
import { logger } from "../log/LogActivity.js";

export const addResponses = async (req, res) => {
  const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
  try {
    const newResponses = await Responses.create(data);
    res.json({ message: "Agregado con éxito" });
    logger({
      httpMethod: req.method,
      endPoint: req.originalUrl,
      action: "Se respondió la encuesta",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const editResponses = async (req, res) => {
  const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
  try {
    const updatedResponses = await Responses.update(
      data.columns, // Aquí defines los campos y sus nuevos valores a actualizar
      data.where // Aquí estableces la condición para la actualización
    );
    res.json({ message: "Editado con éxito" });
    logger({
      httpMethod: req.method,
      endPoint: req.originalUrl,
      action: "Se editó la encuesta",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteResponses = async (req, res) => {
  try {
    const updatedResponses = await Responses.destroy({
      where: {
        id: req.params.responseId,
      },
    });
    res.json({ message: "Eliminado con Exito" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getAllResponses = async (req, res) => {
  const professionals = await Responses.findAll();
  res.json(professionals);
};
