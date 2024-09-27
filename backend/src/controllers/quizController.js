import { Matriz, MatrizQuiz } from "../Models/Matriz.js";
import { Quiz } from "../Models/Quiz.js";
import { StudenstQuiz } from "../Models/StudentsQuiz.js";


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

export const getChartDataQuiz = async (req, res) => {
  try {
    const { idQuiz } = req.params;


    // Obtener respuestas de MatrizQuiz
    const ans1 = await MatrizQuiz.findAll({
      attributes: [["answers", "quiz"]],
      where: {
        quizId: idQuiz,
        completed: 1,
      },
    });

    // Obtener respuestas de StudenstQuiz
    const ans2 = await StudenstQuiz.findAll({
      attributes: [["answers", "quiz"],"studentId"],
      where: {
        quizId: idQuiz,
        completed: 1,
      },
    });
    // console.log(ans2)


    
    // Recorremos el array `ans2`, modificamos los valores de 'answer' y luego actualizamos la BD
    for (const element of ans2) {
      try {
        const parsedQuiz = JSON.parse(element.dataValues.quiz); // Convertimos el campo 'quiz' a JSON


    
        if (parsedQuiz.answers) {
          // console.log(parsedQuiz.answers)
          parsedQuiz.answers.forEach((answerObj, index) => {
            // Cambiamos los valores de 'answer' entre 1 y 5

            const arrayNumber=[5,4,3,4,5]

            const radomNumber = Math.floor(Math.random() * arrayNumber.length);

            // const radomNumber = Math.round(Math.random() * 1e9)

            

            answerObj.answer = `${arrayNumber[radomNumber]}`;
            // console.log(`Nuevo valor de Answer ${index + 1}:`, answerObj.answer);

          });
    
          // Convertimos el JSON modificado nuevamente a string
          const updatedQuizString = JSON.stringify(parsedQuiz);
          const jsonString = JSON.parse(updatedQuizString);

    
          // // Actualizamos el valor en la base de datos usando Sequelize
          // await StudenstQuiz.update(
          //   { answers: jsonString },
          //   { where: { studentId: element.studentId } } // Asegúrate de usar el campo correcto para la identificación
          // );
    
          // console.log(`Registro con ID ${element.studentId} actualizado correctamente.`);
        } else {
          console.log("No se encontró el atributo 'answers' en el objeto.");
        }
      } catch (error) {
        console.error("Error al procesar el campo 'quiz':", error);
      }
    }
    
    console.log("--------------------------------------------------------------------------------");
    




    // Combinar ambas respuestas en un solo array
    const combinedAnswers = [...ans1, ...ans2];

    const { document } = await Quiz.findOne({
      where: {
        idQuiz,
      },
    });

    const questions = JSON.parse(document);
    const chartDataQuestions = questions.map(({ question }) => {
      if (question.typeInput.type === QUESTION_TYPES.RADIO) {
        return {
          question: question.title,
          type: question.typeInput.type,
          data: question.options.map((option) => ({
            name: option.value,
            value: 0,
          })),
        };
      }
      if (question.typeInput.type === QUESTION_TYPES.CHECKBOX) {
        return {
          question: question.title,
          type: question.typeInput.type,
          data: question.options.map((option) => ({
            name: option.value,
            value: 0,
          })),
        };
      }

      return {
        question: question.title,
        type: question.typeInput.type,
        data: [],
      };
    });

    const answers = combinedAnswers.map((answer) => ({
      quiz: JSON.parse(answer.dataValues.quiz),
    }));

    const textValues = new Set();

    answers.map(({ quiz }) => {
      quiz.answers.forEach((answer, index) => {
        if (answer.type === QUESTION_TYPES.RADIO) {
          questions[index]?.question.options.forEach((option, id) => {
            if (option.value === answer.answer) {
              chartDataQuestions[index].data[id].value += 1;
            }
          });
        }

        if (answer.type === QUESTION_TYPES.CHECKBOX) {
          questions[index]?.question.options.forEach((option, id) => {
            if (answer.answer.includes(option.value)) {
              chartDataQuestions[index].data[id].value += 1;
            }
          });
        }

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

    const filled1 = await MatrizQuiz.count({
      where: {
        quizId: idQuiz,
        completed: 1,
      },
    });
    const filled2 = await StudenstQuiz.count({
      where: {
        quizId: idQuiz,
        completed: 1,
      },
    });

    // Sumamos los registros completados de ambas tablas
    const totalFilled = filled1 + filled2;

    res.json({ chartDataQuestions, filled: totalFilled });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const verifyQuizCompleted = async (req, res) => {
  try {
    const { matrizId, quizId } = req.query;
    const completed = await MatrizQuiz.findOne({
      attributes: ["completed"],
      where: {
        idMatriz: matrizId,
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

export const getQuizzesProfessional = async (req, res) => {
  try {
    const { idProfessional } = req.params;
    const quizzes = await Matriz.findAll({
      attributes: [],
      include: [
        {
          model: Quiz,
          attributes: ["idQuiz", "title", "description", "date"],
        },
      ],
      where: {
        idProfessional: idProfessional,
      },
    });

    res.json(quizzes[0]?.quizzes);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const addAnswersQuiz = async (req, res) => {
  try {
    const { quizId, matrizId } = req.query;
    await MatrizQuiz.update(
      {
        answers: req.body,
        completed: 1,
      },
      {
        where: {
          idMatriz: matrizId,
          quizId,
        },
      },
    );
    res.json({ message: "Encuesta completada con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateQuestionsQuiz = async (req, res) => {
  const { idQuiz } = req.params;
  const data = req.body;

  try {
    await Quiz.update(
      {
        document: data,
      },
      {
        where: {
          idQuiz,
        },
      },
    );

    res.json({ message: "Encuesta agregado con éxito" });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllQuizzes = async (req, res) => {
  const data = await Quiz.findAll();
  res.json(data);
};

export const addQuiz = async (req, res) => {
  const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
  try {
    await Quiz.create(data);
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
export const editQuiz = async (req, res) => {
  try {
    const data = req.body;
    const quiz = req.params;
    await Quiz.findOne({
      where: {
        idQuiz: quiz.idQuiz,
      },
    });

    await Quiz.update(data, {
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
