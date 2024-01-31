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

export const getAllQuizzes = async (req, res) => {
  const data = await Quiz.findAll();
  res.json(data);
};

export const addQuiz= async (req, res) => {
  const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
  try {
    const newResponses = await Quiz.create(data);
    res.json({ message: "Agregado con éxito" });
    // logger({
    //   httpMethod: req.method,
    //   endPoint: req.originalUrl,
    //   action: "Se agrego la encuesta",
    // });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const editQuiz= async (req, res) => {
  const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
  try {
    const data = req.body;
    const quiz=req.params;
      const editQuiz = await Quiz.update(data, {
        where: {
          idQuiz: quiz.idQuiz,
        },
      });
      res.json({ message: "Encuesta Editada con éxito" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

