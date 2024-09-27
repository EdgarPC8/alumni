// loggerMiddleware.js
import { getHeaderToken, verifyJWT } from "../libs/jwt.js";
import { logger } from "../log/LogActivity.js";
import { Professionals } from "../Models/Professionals.js";
import { sequelize } from "../database/connection.js";


const methodsToFilter = ["GET","OPTIONS"];
const urlFilter = ["/getMatrizFilter"];
const actions = [
  {
    url: "/api/matriz/editCareer/:careerId",
    action: "Se editó una Carrera",
    method: "PUT"
  },
  {
    url: "/api/matriz/editPeriod/:periodId",
    action: "Se editó un Periodo",
    method: "PUT"
  },
  {
    url: "/api/matriz/addMatriz",
    action: "Se añadió un profesional a una Matriz",
    method: "POST"
  },
  {
    url: "api/matriz/addCareer",
    action: "Se añadió una Carrera",
    method: "POST"
  },
  {
    url: "api/matriz/addPeriod",
    action: "Se añadió un Periodo",
    method: "POST"
  },
  {
    url: "api/matriz/completedQuiz",
    action: "Se completo una Encuesta",
    method: "PUT"
  },
  {
    url: "/api/quiz/editQuiz/:id",
    action: "Se editó una Encuesta",
    method: "PUT"
  },
  {
    url: "/api/matriz/:matrizId/:quizId",
    action: "Se eliminó un Professional-Matriz de una Encuesta asignada",
    method: "DELETE"
  },
  {
    url: "/api/matriz/:matrizId",
    action: "Se eliminó una Profesional de una Matriz",
    method: "DELETE"
  },
];

const loggerMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const system = req.headers['user-agent'];

  if (
    authHeader &&
    authHeader !== "Bearer null" &&
    !methodsToFilter.includes(req.method) &&
    !urlFilter.includes(req.method)
  ) {

    const token = getHeaderToken(req);
    const user = await verifyJWT(token);

    try {
      let ci, firstName, secondName, firstLastName, secondLastName;

      if (user.loginRol === "Estudiante") {
        // Si el rol es "Estudiante", se usan los valores de user.urlWebSession
        ({ ci, firstName, secondName, firstLastName, secondLastName } = user.urlWebSession || {});
      } else {
        // Para otros roles, se busca el profesional en la base de datos
        const professional = await Professionals.findOne({
          attributes: [
            'ci',
            'firstName',
            'secondName',
            'firstLastName',
            'secondLastName',
          ],
          where: {
            userId: user.userId,
          },
        });
        ({ ci, firstName, secondName, firstLastName, secondLastName } = professional?.dataValues || {});
      }

      const fullName = `${firstName || ''} ${secondName || ''} ${firstLastName || ''} ${secondLastName || ''}`;

      // Buscar la acción asociada a la URL y método HTTP actual
      const matchedAction = actions.find(action => {
        // Reemplazar :id con el valor actual del ID
        const pattern = action.url.replace(/:[a-zA-Z0-9]+/g, '[a-zA-Z0-9]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(req.originalUrl) && action.method === req.method;
      });

      const actionText = matchedAction ? matchedAction.action : "Acción desconocida";

      logger({
        httpMethod: req.method,
        endPoint: req.originalUrl,
        action: actionText,
        description: `EL ${user.loginRol} ${fullName} con CI: ${ci}`,
        system: system
      });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  }

  next();
};



export default loggerMiddleware;