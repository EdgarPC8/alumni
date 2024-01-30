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

import {
  Country,
  Cod_country_lenguage,
  Province,
  Canton,
  Parish,
} from "../Models/LinguisticsGeography.js";

// Con ESM
import jsonData from './data/backup.json' assert { type: 'json' };


// Función para insertar roles y usuarios
const insertData = async () => {
  try {
    // console.log("-----------------------------------------------------------------------")
    // console.log(jsonData.UsersBackup)

    await Roles.bulkCreate(jsonData.RolesBackup, { returning: true });
     await Users.bulkCreate(jsonData.UsersBackup, { returning: true });
     await UserRoles.bulkCreate(jsonData.UserRolesBackup, { returning: true });
     await Professionals.bulkCreate(jsonData.ProfessionalsBackup, { returning: true });

   await Quiz.bulkCreate(jsonData.QuizBackup, { returning: true });
   await QuestionTypes.bulkCreate(jsonData.QuestionTypesBackup, { returning: true });
   await Questions.bulkCreate(jsonData.QuestionsBackup, { returning: true });
   await Options.bulkCreate(jsonData.OptionsBackup, { returning: true });
   await Responses.bulkCreate(jsonData.ResponsesBackup, { returning: true });

   await Nominas.bulkCreate(jsonData.NominasBackup, { returning: true });
   await Logger.bulkCreate(jsonData.LoggerBackup, { returning: true });


   await ProfessionalExperience.bulkCreate(jsonData.ProfessionalExperienceBackup, { returning: true });
   await Languages.bulkCreate(jsonData.LanguagesBackup, { returning: true });
   await AcademicProfessionalMerits.bulkCreate(jsonData.AcademicProfessionalMeritsBackup, { returning: true });
   await AcademicTraining.bulkCreate(jsonData.AcademicTrainingBackup, { returning: true });
   await TeachingExperience.bulkCreate(jsonData.TeachingExperienceBackup, { returning: true });
   await CoursesWorkshops.bulkCreate(jsonData.CoursesWorkshopsBackup, { returning: true });
   await IntellectualProduction.bulkCreate(jsonData.IntellectualProductionBackup, { returning: true });
   await Books.bulkCreate(jsonData.BooksBackup, { returning: true });

  
  //  await Country.bulkCreate(jsonData.CountryBackup, { returning: true });
   await Cod_country_lenguage.bulkCreate(jsonData.Cod_country_lenguageBackup, { returning: true });
   await Province.bulkCreate(jsonData.ProvinceBackup, { returning: true });
   await Canton.bulkCreate(jsonData.CantonBackup, { returning: true });
   await Parish.bulkCreate(jsonData.ParishBackup, { returning: true });

  } catch (error) {
    console.error("Error al insertar datos:", error);
  }
};

// Ejecuta la función para insertar datos
// insertData();


export { insertData };
