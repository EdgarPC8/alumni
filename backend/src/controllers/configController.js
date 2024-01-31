import express from "express";
import { Op } from "sequelize";
import fs from "fs";
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

import {
  Matriz,
} from "../Models/Matriz.js";

export const backup = async (req, res) => {
  try {
    const backupFileName = `backup_${Date.now()}.json`;

    // Obtener datos de todas las tablas
    const ProfessionalExperienceBackup = await ProfessionalExperience.findAll();
    const LanguagesBackup = await Languages.findAll();
    const AcademicProfessionalMeritsBackup =await AcademicProfessionalMerits.findAll();
    const AcademicTrainingBackup = await AcademicTraining.findAll();
    const TeachingExperienceBackup = await TeachingExperience.findAll();
    const CoursesWorkshopsBackup = await CoursesWorkshops.findAll();
    const IntellectualProductionBackup = await IntellectualProduction.findAll();
    const BooksBackup = await Books.findAll();
    const UsersBackup = await Users.findAll();
    const UserRolesBackup = await UserRoles.findAll();
    const LoggerBackup = await Logger.findAll();
    const NominasBackup = await Nominas.findAll();
    const ProfessionalsBackup = await Professionals.findAll();
    const RolesBackup = await Roles.findAll();
    const QuestionsBackup = await Questions.findAll();
    const OptionsBackup = await Options.findAll();
    const ResponsesBackup = await Responses.findAll();
    const QuestionTypesBackup = await QuestionTypes.findAll();
    const QuizBackup = await Quiz.findAll();
    const CountryBackup = await Country.findAll();
    const Cod_country_lenguageBackup = await Cod_country_lenguage.findAll();
    const ProvinceBackup = await Province.findAll();
    const CantonBackup = await Canton.findAll();
    const ParishBackup = await Parish.findAll();
    const MatrizBackup = await Matriz.findAll();

    // Crear un objeto que contenga todos los datos
    const backupData = {
        ProfessionalExperienceBackup,
        LanguagesBackup,
        AcademicProfessionalMeritsBackup,
        AcademicTrainingBackup,
        TeachingExperienceBackup,
        CoursesWorkshopsBackup,
        IntellectualProductionBackup,
        BooksBackup,
        UsersBackup,
        UserRolesBackup,
        LoggerBackup,
        NominasBackup,
        ProfessionalsBackup,
        RolesBackup,
        QuestionsBackup,
        OptionsBackup,
        ResponsesBackup,
        QuestionTypesBackup,
        QuizBackup,
        CountryBackup,
        Cod_country_lenguageBackup,
        ProvinceBackup,
        CantonBackup,
        ParishBackup,
        MatrizBackup,
    };

    // Convertir a formato JSON y guardar en un archivo
    fs.writeFileSync(backupFileName, JSON.stringify(backupData, null, 2));

    // Enviar el archivo como respuesta
    res.download(backupFileName, () => {
      // Eliminar el archivo después de descargarlo
      fs.unlinkSync(backupFileName);
    });
  } catch (error) {
    console.error("Backup failed:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Backup failed", error: error.message });
  }
};
