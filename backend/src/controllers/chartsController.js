import { where } from "sequelize";
import {
  Questions,
  Options,
  Responses,
  QuestionTypes,
  Quiz,
} from "../Models/Quiz.js";
import {
  Nominas,
} from "../Models/Nominas.js";


export const getProfesionalsCareers = async (req, res) => {
  const responses = await Nominas.findAll();
  res.json(responses);
};

export const getAllResponses = async (req, res) => {
  try {
    const response = await Responses.findAll({
      attributes: ['textResponse'],
      include: [
        { model: Questions, },
        { model: Quiz },
        { model: Options },
      ],
      where:{
        idQuiz:req.params.quizId,
      }
    });

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Hubo un problema al obtener los datos de la matriz.' });
  }
};


