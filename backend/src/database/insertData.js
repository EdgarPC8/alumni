import {
  ProfessionalExperience,
  Languages,
  AcademicProfessionalMerits,
  AcademicTraining,
  TeachingExperience,
  CoursesWorkshops,
  IntellectualProduction,
  Books,
} from "../Models/CV.js";

import { Users } from "../Models/Users.js";
import { UserRoles } from "../Models/UserRoles.js";
import { Logger } from "../Models/Logging.js";
import { Nominas } from "../Models/Nominas.js";
import { Professionals } from "../Models/Professionals.js";
import { Roles } from "../Models/Roles.js";
import {
  Questions,
  Options,
  Responses,
  QuestionTypes,
  Quiz,
} from "../Models/Quiz.js";

import { Matriz, Carreers, Periods, MatrizQuiz } from "../Models/Matriz.js";

import {
  Country,
  Cod_country_lenguage,
  Province,
  Canton,
  Parish,
} from "../Models/LinguisticsGeography.js";
import { Tutorials } from "../Models/Tutorials.js";

//import jsonData from './data/backup.json' assert { type: 'json' };

import readline from "readline";
import path from "path";
import fs from "fs";
import fileDirName from "../libs/file-dirname.js";
import { readFile } from "fs/promises";

const { __dirname } = fileDirName(import.meta);

const consoleData = async () => {
  const filePath = path.resolve(__dirname, "data", "ENFERMERIA.csv");

  const file = readline.createInterface(fs.createReadStream(filePath));

  const rolesArray = []; // Array para almacenar objetos de roles
  let objMatriz = {};
  let headers = [];
  let contador = 0;

  file.on("line", (line) => {
    const columns = line.split(";");
    if (contador < 5) {
      contador == 0 ? (objMatriz.institucion = columns[0]) : "";
      contador == 1 ? (objMatriz.descripcion = columns[0]) : "";
      contador == 2 ? (objMatriz.titulo = columns[0]) : "";
      contador == 3 ? (objMatriz.carrera = columns[0]) : "";
      contador == 4 ? (objMatriz.periodo = columns[0]) : "";
    } else if (contador == 5) {
      columns.forEach((element) => {
        headers.push(element);
      });
    } else {
      const objValores = {};
      for (let index = 0; index < headers.length; index++) {
        objValores[headers[index]] = columns[index].trim();
      }
      rolesArray.push(objValores);
    }
    objMatriz.table = rolesArray;

    contador++;
  });

  file.on("close", async () => {
    // Ahora, en lugar de realizar directamente la inserción en la base de datos, imprime el array en la consola

    //   {
    //     "id": 1,
    //     "name": "Cabrera Cevallos María Elizabeth",
    //     "ci": 1150892279,
    //     "career": "1",
    //     "phone": "959635280",
    //     "email": "mariliscevas10@hotmail.com",
    //     "modality": "Presencial",
    //     "grateDate": "2022",
    //     "actualOcupation": "Notrabaja",
    //     "postStudy": "No",
    //     "idPeriod": 1,
    //     "idProfessional": 104
    //   },
    // Nombres que deseas asignar a cada campo en el nuevo array
    const nombresCampos = [
      "name",
      "ci",
      "career",
      "phone",
      "email",
      "modality",
      "grateDate",
      "actualOcupation",
      "poststudy",
    ];

    // Crear otro array de objetos usando los nombres de propiedades como nombres de campos
    const nuevoArray = objMatriz.table.map((element) => {
      const nuevoObjeto = {};
      Object.keys(element).forEach((key, index) => {
        nuevoObjeto[nombresCampos[index]] = element[key];
      });
      return nuevoObjeto;
    });

    console.log(
      "\nNuevo array de objetos con nombres de propiedades personalizados:",
    );
    console.log(nuevoArray);
  });
};

// Función para insertar roles y usuarios
const insertData = async () => {
  try {
    const data = await readFile(new URL("./data/backup.json", import.meta.url));

    const jsonData = JSON.parse(data);
    await Roles.bulkCreate(jsonData.RolesBackup, { returning: true });
    await Users.bulkCreate(jsonData.UsersBackup, { returning: true });
    await UserRoles.bulkCreate(jsonData.UserRolesBackup, { returning: true });
    await Professionals.bulkCreate(jsonData.ProfessionalsBackup, {
      returning: true,
    });

    await Quiz.bulkCreate(jsonData.QuizBackup, { returning: true });
    await QuestionTypes.bulkCreate(jsonData.QuestionTypesBackup, {
      returning: true,
    });
    await Questions.bulkCreate(jsonData.QuestionsBackup, { returning: true });
    await Options.bulkCreate(jsonData.OptionsBackup, { returning: true });
    await Responses.bulkCreate(jsonData.ResponsesBackup, { returning: true });

    await Nominas.bulkCreate(jsonData.NominasBackup, { returning: true });
    await Logger.bulkCreate(jsonData.LoggerBackup, { returning: true });

    await ProfessionalExperience.bulkCreate(
      jsonData.ProfessionalExperienceBackup,
      { returning: true },
    );
    await Languages.bulkCreate(jsonData.LanguagesBackup, { returning: true });
    await AcademicProfessionalMerits.bulkCreate(
      jsonData.AcademicProfessionalMeritsBackup,
      { returning: true },
    );
    await AcademicTraining.bulkCreate(jsonData.AcademicTrainingBackup, {
      returning: true,
    });
    await TeachingExperience.bulkCreate(jsonData.TeachingExperienceBackup, {
      returning: true,
    });
    await CoursesWorkshops.bulkCreate(jsonData.CoursesWorkshopsBackup, {
      returning: true,
    });
    await IntellectualProduction.bulkCreate(
      jsonData.IntellectualProductionBackup,
      { returning: true },
    );
    await Books.bulkCreate(jsonData.BooksBackup, { returning: true });

    //  await Country.bulkCreate(jsonData.CountryBackup, { returning: true });
    await Cod_country_lenguage.bulkCreate(jsonData.Cod_country_lenguageBackup, {
      returning: true,
    });
    await Province.bulkCreate(jsonData.ProvinceBackup, { returning: true });
    await Canton.bulkCreate(jsonData.CantonBackup, { returning: true });
    await Parish.bulkCreate(jsonData.ParishBackup, { returning: true });
    await Periods.bulkCreate(jsonData.PeriodsBackup, { returning: true });
    await Carreers.bulkCreate(jsonData.CarreersBackup, { returning: true });
    await Matriz.bulkCreate(jsonData.MatrizBackup, { returning: true });
    await MatrizQuiz.bulkCreate(jsonData.MatrizQuizBackup, { returning: true });
    await Tutorials.bulkCreate(jsonData.TutorialsBackup, { returning: true });
  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
};

// Ejecuta la función para insertar datos
// insertData();

export { insertData, consoleData };
