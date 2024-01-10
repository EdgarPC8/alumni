import { Roles } from "../Models/Roles.js";
import readline from "readline";
import path from "path";
import fs from "fs";
import fileDirName from "../libs/file-dirname.js";
import { Users } from "../Models/Users.js";
import { Professionals } from "../Models/Professionals.js";
import { Nominas } from "../Models/Nominas.js";
import { Questions,Options,QuestionTypes,Responses,Quiz} from "../Models/Quiz.js";
// import { UserData } from "../Models/UserData.js";
const { __dirname } = fileDirName(import.meta);
import { UserRoles } from "../Models/UserRoles.js";
import { Usuario } from "./data/cuentas.js";
import { NominasArray } from "./data/nominas.js";
import { QuizzesArray,QuestionTypesArray } from "./data/quizInsert.js";

const insertRoles = async () => {
  const filePath = path.resolve(__dirname, "data", "roles.csv");

  const file = readline.createInterface(fs.createReadStream(filePath));

  const roles = [];

  file.on("line", async (rol) => {
    roles.push({ rol });
  });

  file.on("close", async () => {
    await Roles.bulkCreate(roles);
  });
};

const insertDefaultUsers = async () => {
  const cuentas = Usuario.cuentas;

 

  const users = cuentas.map(
    ([username, password, arrayRoles, { userInfo }]) => {
      const {
        ci,
        firstName,
        secondName,
        firstLastName,
        secondLastName,
        photo,
      } = userInfo;

      return {
        username,
        password,
        ci,
        firstName,
        secondName,
        firstLastName,
        photo,
        secondLastName,
      };
    }
  );
  const professionals = cuentas.map(
    ([username, password, arrayRoles, { userInfo,professionals }]) => {
      const {
        ci,
        firstName,
        secondName,
        firstLastName,
        secondLastName,
        birthDate,
        gender,
        direction,
        homePhone,
        cellPhone,
        personalEmail,
        institutionalEmail,
        image
      } = professionals;

      return {
        ci,
        firstName,
        secondName,
        firstLastName,
        secondLastName,
        birthDate,
        gender,
        direction,
        homePhone,
        cellPhone,
        personalEmail,
        institutionalEmail,
        image
      };
    }
  );
  const createdProfessionals = await Professionals.bulkCreate(professionals, { returning: true });


  const rolesUser = cuentas.map(([username, password, roles]) => {
    return roles;
  });

  const quizzes = QuizzesArray.map(
    ({idQuiz,title,description,date}) => {
      return {idQuiz,title,description,date};
    }
  );

  //Creacion de inserts
  const createdUsers = await Users.bulkCreate(users, { returning: true });
 // Suponiendo que tienes un modelo Responses y Sequelize como ORM

const arrayPreguntasCerradas = [1, 3, 8];
const arrayPreguntasCerradasRespuestas = ["Si", "No"];
const responses=[]
const arrayCarreras=[
  "TECNOLOGIA SUPERIOR EN ADMINISTRACION",
  "TECNOLOGIA SUPERIOR EN DESARROLLO DE SOFTWARE",
  "TECNOLOGIA SUPERIOR EN ELECTRICIDAD",
  "TECNOLOGIA SUPERIOR EN MECANICA AUTOMOTRIZ",
    ]

for (let index = 1; index < 103; index++) {
  const respuestaAleatoriaCarrera =
      arrayCarreras[
        Math.floor(Math.random() * arrayCarreras.length)
      ];
  responses.push({
    idQuiz: 1,
    idQuestion: 2,
    userId: index,
    textResponse: respuestaAleatoriaCarrera,
    idOption: null,
  });

  for (let i = 0; i < arrayPreguntasCerradas.length; i++) {
    const preguntaId = arrayPreguntasCerradas[i];
    const respuestaAleatoria =
      arrayPreguntasCerradasRespuestas[
        Math.floor(Math.random() * arrayPreguntasCerradasRespuestas.length)
      ];


      responses.push({
        idQuiz: 1,
        idQuestion: preguntaId,
        userId: index,
        textResponse: respuestaAleatoria,
        idOption: null,
      });
    
  }
}

console.log("-----------------------------------------------------------------------------------------------")
console.log(responses)


await QuestionTypes.bulkCreate(QuestionTypesArray, { returning: true });
await Quiz.bulkCreate(quizzes, { returning: true });
await Questions.bulkCreate(QuizzesArray[0]["questions"], { returning: true });
await Options.bulkCreate(QuizzesArray[0]["options"], { returning: true });
await Responses.bulkCreate(responses, { returning: true });
await Nominas.bulkCreate(NominasArray, { returning: true });

  const bulkUserRoles = createdUsers
    .map((user, index) => {
      return rolesUser[index].map((roleId) => {
        return { userId: user.userId, roleId };
      });
    })
    .flat();

  await UserRoles.bulkCreate(bulkUserRoles);
};


const insertData = async () => {
  await insertRoles();
  setTimeout(async () => {
    await insertDefaultUsers();
  }, 2000);
};

export { insertData };
