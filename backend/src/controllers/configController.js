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

import { sequelize } from "../database/connection.js";

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

import { insertData } from "../database/insertData.js";
import {
  Matriz,
  Carreers,
  Periods,
  MatrizQuiz,
} from "../Models/Matriz.js";
import {
  Tutorials,
} from "../Models/Tutorials.js";

export const backup = async (req, res) => {
  try {
    const backupFileName = `backup_${Date.now()}.json`;

    // Obtener datos de todas las tablas
    const ProfessionalExperienceBackup = await ProfessionalExperience.findAll();
    const LanguagesBackup = await Languages.findAll();
    const AcademicProfessionalMeritsBackup =
      await AcademicProfessionalMerits.findAll();
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
    const CarreersBackup = await Carreers.findAll();
    const PeriodsBackup = await Periods.findAll();
    const MatrizQuizBackup = await MatrizQuiz.findAll();
    const TutorialsBackup = await Tutorials.findAll();

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
        CarreersBackup,
        PeriodsBackup,
        MatrizQuizBackup,
        TutorialsBackup,
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

export const updateDataBase = async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await insertData();

    res.json({ message: "Base de datos actualizada" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "La base de datos no se pudo actualizar",
        error: error.message,
      });
  }
};
export const getAllTutorials = async (req, res) => {
  const tuto = await Tutorials.findAll();
  res.json(tuto);
};

export const addTutorials= async (req, res) => {
  const data = req.body; // Suponiendo que los datos están en el cuerpo de la solicitud
  try {
    const newTutorials= await Tutorials.create(data);
    res.json({ message: "Agregado con éxito" });
    // logger({
    //   httpMethod: req.method,
    //   endPoint: req.originalUrl,
    //   action: `Se agregó un profesional ${newProfessional.ci} ${newProfessional.firstName} ${newProfessional.firstLastName}`,
    // });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const editTutorials= async (req, res) => {
  const data = req.body;
  const profesional=req.params;
  try {
    const editProfessional = await Tutorials.update(data, {
      where: {
        id: profesional.tutorialId,
      },
    });
    res.json({ message: "Profesional Editado con éxito" });
  //   logger({
  //     httpMethod: req.method,
  //     endPoint: req.originalUrl,
  //     action: "Se editó un profesional",
  //     description:`El Usuario ah Editado al Profesional ${data.firstName} ${data.firstLastName}`
  // })
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const deleteTutorials = async (req, res) => {
  try {
    const removingUser = await Tutorials.destroy({
      where: {
        id: req.params.tutorialsId,
      },
    });
    res.json({ message: "Eliminado con éxito" });

  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


