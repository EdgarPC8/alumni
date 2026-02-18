import { promises as fs } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import { Roles } from '../models/Roles.js';
import { Users } from '../models/Users.js';
import { 
  QuizQuizzes,
  QuizQuestions,
  QuizOptions,
  QuizAttempts,
  QuizAssignment,
  QuizAnswers,

} from '../models/Quiz.js';
import { Account, AccountRoles } from '../models/Account.js';
import { Careers, Matricula, Matriz, Periods } from '../models/Alumni.js';
import { Form, Question, Option, Response, Answer, AccountForm } from "../models/Forms.js";
import { Notifications } from '../models/Notifications.js';
import { NotificationProgram } from '../models/NotificationProgram.js';

import { CvTemplate } from '../models/CvTemplate.js';
import { Empresa } from '../models/Empresa.js';
import { OfertaLaboral } from '../models/OfertaLaboral.js';
import { Postulacion } from '../models/Postulacion.js';
import { sequelize } from './connection.js';





// Rutas relativas al archivo para que siempre sean src/database y src/backups
export const backupFilePath = resolve(__dirname, 'backup.json');
export const backups = resolve(__dirname, '..', 'backups');

// ===== Helpers anti "JSON doble stringificado" =====

const unwrapJsonString = (value, maxDepth = 12) => {
  let v = value;

  for (let i = 0; i < maxDepth; i++) {
    if (typeof v !== "string") break;

    const s = v.trim();
    const looksJson =
      (s.startsWith("{") && s.endsWith("}")) ||
      (s.startsWith("[") && s.endsWith("]")) ||
      (s.startsWith('"') && s.endsWith('"'));

    if (!looksJson) break;

    try {
      v = JSON.parse(s);
    } catch {
      break;
    }
  }

  return v;
};

export const insertData = async () => {
  try {
    await fs.access(backupFilePath);
    console.log("El archivo de respaldo ya existe.");

    const data = await fs.readFile(backupFilePath, "utf8");
    const jsonData = JSON.parse(data);

    // Limpiar tablas antes de insertar (evita UNIQUE constraint con ids existentes)
    await sequelize.query("PRAGMA foreign_keys = OFF");
    const tablesToTruncate = [
      "quiz_answers", "quiz_options", "quiz_attempts", "quiz_quizzes_users",
      "quiz_questions", "quiz_quizzes",
      "bolsa_postulacion", "bolsa_oferta_laboral", "bolsa_empresa",
      "cv_templates", "accountRoles", "alumni_matricula", "alumni_matrices",
      "form_accountForms", "form_usersForms", "form_answers", "form_responses", "form_options",
      "form_questions", "form_forms",
      "notification_programs", "notifications", "account", "alumni_careers", "alumni_periods", "roles", "users",
    ];
    for (const t of tablesToTruncate) {
      try {
        await sequelize.query(`DELETE FROM ${t}`);
      } catch (e) {
        // ignorar si la tabla no existe
      }
    }
    await sequelize.query("PRAGMA foreign_keys = ON");

    // Limpieza de QuizAnswers (selectedOptionIds)
    if (Array.isArray(jsonData.QuizAnswers)) {
      jsonData.QuizAnswers = jsonData.QuizAnswers.map((row) => {
        if (typeof row.selectedOptionIds === "string") {
          const fixed = unwrapJsonString(row.selectedOptionIds);
          if (Array.isArray(fixed)) row.selectedOptionIds = fixed;
        }
        return row;
      });
    }

    // ===== Inserts =====
    await Roles.bulkCreate(jsonData.Roles, { returning: true });
    await Users.bulkCreate(jsonData.Users, { returning: true });
    await Account.bulkCreate(jsonData.Account, { returning: true });
    await Careers.bulkCreate(jsonData.Careers, { returning: true });
    await Periods.bulkCreate(jsonData.Periods, { returning: true });

    await Form.bulkCreate(jsonData.Form, { returning: true });
    await Question.bulkCreate(jsonData.Question, { returning: true });
    await Option.bulkCreate(jsonData.Option, { returning: true });
    await Response.bulkCreate(jsonData.Response, { returning: true });
    await Answer.bulkCreate(jsonData.Answer, { returning: true });
    if (Array.isArray(jsonData.AccountForm) && jsonData.AccountForm.length > 0) {
      await AccountForm.bulkCreate(jsonData.AccountForm, { returning: true });
    }

    await Matriz.bulkCreate(jsonData.Matriz, { returning: true });
    await Matricula.bulkCreate(jsonData.Matricula, { returning: true });

    await AccountRoles.bulkCreate(jsonData.AccountRoles, { returning: true });
    await Notifications.bulkCreate(jsonData.Notifications, { returning: true });

    await QuizQuizzes.bulkCreate(jsonData.QuizQuizzes, { returning: true });
    await QuizQuestions.bulkCreate(jsonData.QuizQuestions, { returning: true });
    await QuizOptions.bulkCreate(jsonData.QuizOptions, { returning: true });
    await QuizAttempts.bulkCreate(jsonData.QuizAttempts, { returning: true });
    await QuizAnswers.bulkCreate(jsonData.QuizAnswers, { returning: true });
    await QuizAssignment.bulkCreate(jsonData.QuizAssignment, { returning: true });

    if (Array.isArray(jsonData.CvTemplates) && jsonData.CvTemplates.length > 0) {
      await CvTemplate.bulkCreate(jsonData.CvTemplates, { returning: true });
    }

    // Bolsa de empleo
    if (Array.isArray(jsonData.Empresa) && jsonData.Empresa.length > 0) {
      await Empresa.bulkCreate(jsonData.Empresa, { returning: true });
    }
    if (Array.isArray(jsonData.OfertaLaboral) && jsonData.OfertaLaboral.length > 0) {
      await OfertaLaboral.bulkCreate(jsonData.OfertaLaboral, { returning: true });
    }
    if (Array.isArray(jsonData.Postulacion) && jsonData.Postulacion.length > 0) {
      await Postulacion.bulkCreate(jsonData.Postulacion, { returning: true });
    }

    if (Array.isArray(jsonData.NotificationProgram) && jsonData.NotificationProgram.length > 0) {
      await NotificationProgram.bulkCreate(jsonData.NotificationProgram, { returning: true });
    } else {
      const count = await NotificationProgram.count();
      if (count === 0) {
        await NotificationProgram.bulkCreate([
          { code: "BUENOS_DIAS", title: "Buenos días", message: "¡Que tengas un excelente día!", scheduleType: "daily", scheduleTime: "08:00", scopeType: "user", targetType: "all_users", active: false },
          { code: "BUENAS_TARDES", title: "Buenas tardes", message: "¡Que tengas una excelente tarde!", scheduleType: "daily", scheduleTime: "14:00", scopeType: "user", targetType: "all_users", active: false },
          { code: "BIENVENIDA", title: "Bienvenida", message: "¡Bienvenido al sistema! Esperamos que tengas una excelente experiencia.", scheduleType: "manual", scopeType: "user", targetType: "all_users", active: true },
          { code: "ACTUALIZACION", title: "Actualización del sistema", message: "Se realizaron mejoras en el sistema. ¡Explora las nuevas funcionalidades!", scheduleType: "manual", scopeType: "user", targetType: "all_users", active: true },
        ]);
      }
    }

    console.log("Datos insertados correctamente desde el archivo de respaldo.");
  } catch (error) {
    if (error.code === "ENOENT") {
      const defaultBackup = {
        Roles: [], Users: [], Account: [], AccountRoles: [],
        Careers: [], Periods: [], Matriz: [], Matricula: [],
        Form: [], Question: [], Option: [], Response: [], Answer: [], AccountForm: [],
        NotificationProgram: [], Notifications: [], QuizQuizzes: [], QuizQuestions: [], QuizOptions: [],
        QuizAttempts: [], QuizAnswers: [], QuizAssignment: [],
        CvTemplates: [],
        Empresa: [], OfertaLaboral: [], Postulacion: [],
      };
      await fs.writeFile(backupFilePath, JSON.stringify(defaultBackup, null, 2));
      console.log("Archivo de respaldo creado: backup.json");
    } else {
      console.error("Error al insertar datos:", error);
    }
  }
};


export const saveBackup = async () => {
  try {
    const rolesData = await Roles.findAll({ raw: true });
    const usersData = await Users.findAll({ raw: true });
    const accountData = await Account.findAll({ raw: true });
    const careersData = await Careers.findAll({ raw: true });
    const periodsData = await Periods.findAll({ raw: true });

    const FormData = await Form.findAll({ raw: true });
    const QuestionData = await Question.findAll({ raw: true });
    const OptionData = await Option.findAll({ raw: true });
    const ResponseData = await Response.findAll({ raw: true });
    const AnswerData = await Answer.findAll({ raw: true });
    const AccountFormData = await AccountForm.findAll({ raw: true });

    const MatrizData = await Matriz.findAll({ raw: true });
    const MatriculaData = await Matricula.findAll({ raw: true });

    const AccountRolesData = await AccountRoles.findAll({ raw: true });
    const NotificationProgramData = await NotificationProgram.findAll({ raw: true });
    const NotificationsData = await Notifications.findAll({ raw: true });

    const QuizAnswersData = await QuizAnswers.findAll({ raw: true });
    const QuizAttemptsData = await QuizAttempts.findAll({ raw: true });
    const QuizOptionsData = await QuizOptions.findAll({ raw: true });
    const QuizQuestionsData = await QuizQuestions.findAll({ raw: true });
    const QuizQuizzesData = await QuizQuizzes.findAll({ raw: true });
    const QuizAssignmentData = await QuizAssignment.findAll({ raw: true });

    const CvTemplatesData = await CvTemplate.findAll({ raw: true });
    const EmpresaData = await Empresa.findAll({ raw: true });
    const OfertaLaboralData = await OfertaLaboral.findAll({ raw: true });
    const PostulacionData = await Postulacion.findAll({ raw: true });

    const backupData = {
      Roles: rolesData,
      Users: usersData,
      Account: accountData,
      Careers: careersData,
      Periods: periodsData,
      Form: FormData,
      Question: QuestionData,
      Option: OptionData,
      Response: ResponseData,
      Answer: AnswerData,
      AccountForm: AccountFormData,
      Matriz: MatrizData,
      Matricula: MatriculaData,
      AccountRoles: AccountRolesData,
      NotificationProgram: NotificationProgramData,
      Notifications: NotificationsData,
      QuizAnswers: QuizAnswersData,
      QuizAttempts: QuizAttemptsData,
      QuizOptions: QuizOptionsData,
      QuizQuestions: QuizQuestionsData,
      QuizQuizzes: QuizQuizzesData,
      QuizAssignment: QuizAssignmentData,
      CvTemplates: CvTemplatesData,
      Empresa: EmpresaData,
      OfertaLaboral: OfertaLaboralData,
      Postulacion: PostulacionData,
    };

    await fs.mkdir(backups, { recursive: true });

    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}_${pad(now.getHours())}-${pad(now.getMinutes())}-${pad(now.getSeconds())}`;

    const backupFileName = `backup-${timestamp}.json`;
    const backupPath = resolve(backups, backupFileName);

    await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2));
    await fs.writeFile(backupFilePath, JSON.stringify(backupData, null, 2));

    console.log("Backup guardado correctamente en:", backupPath);
    console.log("Archivo de respaldo principal actualizado:", backupFilePath);

    return backupPath;
  } catch (error) {
    console.error("Error al guardar el backup:", error);
    throw error;
  }
};


export const downloadBackup = async (req, res) => {
  try {
    const backupPath = await saveBackup(); // Guarda y retorna la ruta del archivo

    res.download(backupPath, (err) => {
      if (err) {
        console.error("Error al enviar el archivo:", err);
        res.status(500).send("Error al enviar el archivo.");
      }
    });
  } catch (error) {
    console.error("Error al realizar el backup:", error);
    res.status(500).send("Error al realizar el backup.");
  }
};

