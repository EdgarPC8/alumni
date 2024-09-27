import { Matricula } from "../Models/Matricula.js";
import { Quiz } from "../Models/Quiz.js";
import { StudenstQuiz } from "../Models/StudentsQuiz.js";


export const getAllStudentsQuiz = async (req, res) => {
  const data = await StudenstQuiz.findAll();
  res.json(data);
};


export const addStudentsQuiz = async (req, res) => {
  const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
  try {
    const newProfessional = await StudenstQuiz.create(data);
    
    res.json({ message: `Agregado con éxito` });
    // res.json({ message: data });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteStudentQuiz = async (req, res) => {
  try {
    const removingUser = await StudenstQuiz.destroy({
      where: {
        studentId: req.params.matriId,
        quizId: req.params.quizId,
      },
    });
    res.json({ message: "Eliminado con éxito" });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getStudentQuizFilter = async (req, res) => {
  const data = req.body;
  let professional;

  try {

    if (req.params.quizId != 0) {
      professional = await Matricula.findAll({
        where: {
          quizId: req.params.quizId,
        },
      });
    } else {
      professional = await Quiz.findAll({
        include: [{ model: Matricula }],
      });
    }
    res.json(professional);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getQuizzesStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const quizzes = await Matricula.findAll({
      attributes: [],
      include: [
        {
          model: Quiz,
          attributes: ["idQuiz", "title", "description", "date"],
        },
      ],
      where: {
        id_estudiante: studentId,
      },
    });

  

    res.json(quizzes[0]?.quizzes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// -----------------------------------------------------------------------------------------------------------------------------------------------

const QUESTION_TYPES = {
  INPUT: "input",
  CHECKBOX: "checkbox",
  RADIO: "radio",
  TEXTAREA: "textarea",
};

export const getOneQuiz = async (req, res) => {
  try {
    const { document, idQuiz, title, date, description } = await Quiz.findOne({
      where: {
        idQuiz: req.params.idQuiz,
      },
    });

    res.json({
      idQuiz,
      title,
      date,
      description,
      document: JSON.parse(document),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const getChartDataQuizStudent = async (req, res) => {
  try {
    const { idQuiz } = req.params;
    const ans = await StudenstQuiz.findAll({
      attributes: [["answers", "quiz"]],
      where: {
        quizId: idQuiz,
        completed: 1,
      },
    });

    const { document } = await Quiz.findOne({
      where: {
        idQuiz: req.params.idQuiz,
      },
    });

    const questions = JSON.parse(document);
    const chartDataQuestions = questions.map(
      ({ question, typeInput, options }) => {
        if (typeInput.type === QUESTION_TYPES.RADIO) {
          return {
            question: question.value,
            type: typeInput.type,
            data: options.map((option) => ({ name: option.value, value: 0 })),
          };
        }
        if (typeInput.type === QUESTION_TYPES.CHECKBOX) {
          return {
            question: question.value,
            type: typeInput.type,
            data: options.map((option) => ({ name: option.value, value: 0 })),
          };
        }

        return {
          question: question.value,
          type: typeInput.type,
          data: [],
        };
      },
    );

    const answers = ans.map((answer) => ({
      quiz: JSON.parse(answer.dataValues.quiz),
    }));

    const textValues = new Set();

    answers.map(({ quiz }) => {
      quiz.answers.forEach((answer, index) => {
        if (answer.type === QUESTION_TYPES.RADIO) {
          questions[index]?.options.forEach((option, id) => {
            if (option.value === answer.answer) {
              chartDataQuestions[index].data[id].value += 1;
            }
          });
        }

        if (answer.type === QUESTION_TYPES.CHECKBOX) {
          questions[index]?.options.forEach((option, id) => {
            if (answer.answer.includes(option.value)) {
              chartDataQuestions[index].data[id].value += 1;
            }
          });
        }
        //
        if (
          answer.type === QUESTION_TYPES.TEXTAREA ||
          answer.type === QUESTION_TYPES.INPUT
        ) {
          if (textValues.has(answer.answer)) {
            chartDataQuestions[index].data.forEach(
              (_, i) => (chartDataQuestions[index].data[i].value += 1),
            );
            return;
          }

          textValues.add(answer.answer);
          chartDataQuestions[index].data.push({
            name: answer.answer,
            value: 1,
          });
        }
      });
    });

    const filled = await MatrizQuiz.count({
      where: {
        quizId: idQuiz,
        completed: 1,
      },
    });

    res.json({ chartDataQuestions, filled });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const verifyQuizCompletedStudent = async (req, res) => {
  try {
    const { studentId, quizId } = req.query;
    const completed = await StudenstQuiz.findOne({
      attributes: ["completed"],
      where: {
        studentId: studentId,
        quizId,
      },
    });
    res.json(completed);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const addAnswersQuizStudent = async (req, res) => {
  try {
    const { quizId, studentId } = req.query;
    await StudenstQuiz.update(
      {
        answers: req.body,
        completed: 1,
      },
      {
        where: {
          studentId: studentId,
          quizId,
        },
      },
    );
    res.json({ message: "Encuesta completada con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};