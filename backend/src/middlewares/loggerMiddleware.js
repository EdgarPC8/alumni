// loggerMiddleware.js
import { getHeaderToken, verifyJWT } from "../libs/jwt.js";
import { logger } from "../log/LogActivity.js";
import { sequelize } from "../database/connection.js";
import { Account } from "../models/Account.js";
import { Roles } from "../models/Roles.js";
import { Users } from "../models/Users.js";

const methodsToFilter = ["GET", "OPTIONS"];
const urlFilter = ["/getMatrizFilter", "/getSession", "/getLicenses", "/unreadCount"];

const actions = [
  // Auth
  { url: "/alumniapi/login", action: "Inicio de sesión", method: "POST" },
  { url: "/alumniapi/changeRole", action: "Cambio de rol", method: "POST" },
  { url: "/alumniapi/renoveLicense", action: "Renovación de licencia", method: "POST" },
  { url: "/alumniapi/addLicense", action: "Añadir licencia", method: "POST" },
  { url: "/alumniapi/license/:id", action: "Eliminar licencia", method: "DELETE" },
  { url: "/alumniapi/license/:id", action: "Actualizar licencia", method: "PUT" },
  { url: "/alumniapi/smistms/login", action: "Login SMISTMS", method: "POST" },
  // Users
  { url: "/alumniapi/users/me/data", action: "Actualizar mis datos", method: "PUT" },
  { url: "/alumniapi/users/photo/:userId", action: "Subir foto de usuario", method: "PUT" },
  { url: "/alumniapi/users", action: "Crear usuario", method: "POST" },
  { url: "/alumniapi/users/bulk", action: "Crear usuarios en lote", method: "POST" },
  { url: "/alumniapi/users/:userId", action: "Eliminar usuario", method: "DELETE" },
  { url: "/alumniapi/users/:userId", action: "Actualizar usuario", method: "PUT" },
  { url: "/alumniapi/users/photo/:userId", action: "Eliminar foto de usuario", method: "DELETE" },
  // Accounts
  { url: "/alumniapi/account", action: "Crear cuenta", method: "POST" },
  { url: "/alumniapi/account/:id", action: "Eliminar cuenta", method: "DELETE" },
  { url: "/alumniapi/account/:id", action: "Actualizar cuenta", method: "PUT" },
  { url: "/alumniapi/account/resetPassword/:id", action: "Restablecer contraseña", method: "PUT" },
  { url: "/alumniapi/account/updateAccountUser/:id/:userId/:rolId", action: "Actualizar cuenta-usuario", method: "PUT" },
  { url: "/alumniapi/rol", action: "Crear rol", method: "POST" },
  { url: "/alumniapi/rol/:id", action: "Eliminar rol", method: "DELETE" },
  { url: "/alumniapi/rol/:id", action: "Actualizar rol", method: "PUT" },
  // Alumni - Matriz, Carreras, Periodos
  { url: "/alumniapi/alumni/filterUsers", action: "Filtrar usuarios", method: "POST" },
  { url: "/alumniapi/alumni/filterAccounts", action: "Filtrar cuentas", method: "POST" },
  { url: "/alumniapi/alumni/matricula/bulk", action: "Añadir matrículas en lote", method: "POST" },
  { url: "/alumniapi/alumni/matriz", action: "Añadir matriz", method: "POST" },
  { url: "/alumniapi/alumni/matriz/:id", action: "Editar matriz", method: "PUT" },
  { url: "/alumniapi/alumni/matriz/:id", action: "Eliminar matriz", method: "DELETE" },
  { url: "/alumniapi/alumni/career", action: "Añadir carrera", method: "POST" },
  { url: "/alumniapi/alumni/career/:id", action: "Editar carrera", method: "PUT" },
  { url: "/alumniapi/alumni/career/:id", action: "Eliminar carrera", method: "DELETE" },
  { url: "/alumniapi/alumni/period", action: "Añadir periodo", method: "POST" },
  { url: "/alumniapi/alumni/period/:id", action: "Editar periodo", method: "PUT" },
  { url: "/alumniapi/alumni/period/:id", action: "Eliminar periodo", method: "DELETE" },
  // Forms (Encuestas)
  { url: "/alumniapi/forms", action: "Crear encuesta", method: "POST" },
  { url: "/alumniapi/forms/:id", action: "Eliminar encuesta", method: "DELETE" },
  { url: "/alumniapi/forms/:id", action: "Editar encuesta", method: "PUT" },
  { url: "/alumniapi/forms/assign/:formId", action: "Asignar encuesta", method: "POST" },
  { url: "/alumniapi/forms/assign/:formId/:accountId", action: "Quitar asignación de encuesta", method: "DELETE" },
  { url: "/alumniapi/forms/manage/:id", action: "Añadir/editar preguntas de encuesta", method: "POST" },
  { url: "/alumniapi/forms/submit/:id", action: "Responder encuesta", method: "POST" },
  // Notifications
  { url: "/alumniapi/notifications", action: "Crear notificación", method: "POST" },
  { url: "/alumniapi/notifications/seen/:id", action: "Marcar notificación como leída", method: "PUT" },
  { url: "/alumniapi/notifications/:id", action: "Eliminar notificación", method: "DELETE" },
  // Notification Programs
  { url: "/alumniapi/notification-programs", action: "Crear programa de notificación", method: "POST" },
  { url: "/alumniapi/notification-programs/:id", action: "Actualizar programa de notificación", method: "PUT" },
  { url: "/alumniapi/notification-programs/:id", action: "Eliminar programa de notificación", method: "DELETE" },
  { url: "/alumniapi/notification-programs/:id/send", action: "Enviar notificación programada ahora", method: "POST" },
  // Bolsa de empleo
  { url: "/alumniapi/bolsa-empleo/empresa/perfil", action: "Crear perfil de empresa", method: "POST" },
  { url: "/alumniapi/bolsa-empleo/empresa/perfil", action: "Actualizar perfil de empresa", method: "PUT" },
  { url: "/alumniapi/bolsa-empleo/empresa/perfil/logo", action: "Subir logo de empresa", method: "PUT" },
  { url: "/alumniapi/bolsa-empleo/empresa/perfil/logo", action: "Eliminar logo de empresa", method: "DELETE" },
  { url: "/alumniapi/bolsa-empleo/admin/empresas", action: "Crear empresa (admin)", method: "POST" },
  { url: "/alumniapi/bolsa-empleo/admin/empresas/:id", action: "Actualizar empresa (admin)", method: "PUT" },
  { url: "/alumniapi/bolsa-empleo/admin/empresas/:id/logo", action: "Subir logo de empresa (admin)", method: "PUT" },
  { url: "/alumniapi/bolsa-empleo/admin/empresas/:id/logo", action: "Eliminar logo de empresa (admin)", method: "DELETE" },
  { url: "/alumniapi/bolsa-empleo/empresa/ofertas", action: "Crear oferta laboral", method: "POST" },
  { url: "/alumniapi/bolsa-empleo/empresa/ofertas/:id", action: "Actualizar oferta laboral", method: "PUT" },
  { url: "/alumniapi/bolsa-empleo/empresa/ofertas/:id/estado", action: "Cambiar estado de oferta", method: "PATCH" },
  { url: "/alumniapi/bolsa-empleo/empresa/postulaciones/:id", action: "Actualizar estado de postulación", method: "PATCH" },
  { url: "/alumniapi/bolsa-empleo/ofertas/:id/postular", action: "Postularse a oferta", method: "POST" },
  // Quiz (Cuestionarios)
  { url: "/alumniapi/quiz", action: "Crear cuestionario", method: "POST" },
  { url: "/alumniapi/quiz/:id", action: "Editar cuestionario", method: "PUT" },
  { url: "/alumniapi/quiz/:id", action: "Eliminar cuestionario", method: "DELETE" },
  { url: "/alumniapi/quiz/questions/:id", action: "Añadir/editar preguntas de cuestionario", method: "PUT" },
  { url: "/alumniapi/quiz/assign/:quizId", action: "Asignar usuarios a cuestionario", method: "POST" },
  { url: "/alumniapi/quiz/assign/:quizId/:userId", action: "Quitar asignación de cuestionario", method: "DELETE" },
  { url: "/alumniapi/quiz/submit/:quizId", action: "Responder cuestionario", method: "POST" },
  // CV (Hoja de vida)
  { url: "/alumniapi/cv/professional", action: "Actualizar profesional CV", method: "PUT" },
  { url: "/alumniapi/cv/professional/photo", action: "Subir foto CV", method: "PUT" },
  { url: "/alumniapi/cv/professional/photo", action: "Eliminar foto CV", method: "DELETE" },
  { url: "/alumniapi/cv/templates", action: "Guardar plantillas CV", method: "POST" },
  { url: "/alumniapi/cv/academic-training", action: "Añadir formación académica", method: "POST" },
  { url: "/alumniapi/cv/academic-training/:academicId", action: "Editar formación académica", method: "PUT" },
  { url: "/alumniapi/cv/academic-training/:academicId", action: "Eliminar formación académica", method: "DELETE" },
  { url: "/alumniapi/cv/teaching-experience", action: "Añadir experiencia docente", method: "POST" },
  { url: "/alumniapi/cv/teaching-experience/:teachingId", action: "Editar experiencia docente", method: "PUT" },
  { url: "/alumniapi/cv/teaching-experience/:teachingId", action: "Eliminar experiencia docente", method: "DELETE" },
  { url: "/alumniapi/cv/courses-workshops", action: "Añadir cursos/talleres", method: "POST" },
  { url: "/alumniapi/cv/courses-workshops/:courseId", action: "Editar curso/taller", method: "PUT" },
  { url: "/alumniapi/cv/courses-workshops/:courseId", action: "Eliminar curso/taller", method: "DELETE" },
  { url: "/alumniapi/cv/intellectual-production", action: "Añadir producción intelectual", method: "POST" },
  { url: "/alumniapi/cv/intellectual-production/:intellectualId", action: "Editar producción intelectual", method: "PUT" },
  { url: "/alumniapi/cv/intellectual-production/:intellectualId", action: "Eliminar producción intelectual", method: "DELETE" },
  { url: "/alumniapi/cv/books", action: "Añadir libros", method: "POST" },
  { url: "/alumniapi/cv/books/:bookId", action: "Editar libro", method: "PUT" },
  { url: "/alumniapi/cv/books/:bookId", action: "Eliminar libro", method: "DELETE" },
  { url: "/alumniapi/cv/merits", action: "Añadir méritos", method: "POST" },
  { url: "/alumniapi/cv/merits/:meritId", action: "Editar mérito", method: "PUT" },
  { url: "/alumniapi/cv/merits/:meritId", action: "Eliminar mérito", method: "DELETE" },
  { url: "/alumniapi/cv/languages", action: "Añadir idiomas", method: "POST" },
  { url: "/alumniapi/cv/languages/:languageId", action: "Editar idioma", method: "PUT" },
  { url: "/alumniapi/cv/languages/:languageId", action: "Eliminar idioma", method: "DELETE" },
  { url: "/alumniapi/cv/professional-experience", action: "Añadir experiencia profesional", method: "POST" },
  { url: "/alumniapi/cv/professional-experience/:experienceId", action: "Editar experiencia profesional", method: "PUT" },
  { url: "/alumniapi/cv/professional-experience/:experienceId", action: "Eliminar experiencia profesional", method: "DELETE" },
  // Comands
  { url: "/alumniapi/comands/createLicense", action: "Crear licencia", method: "GET" },
  { url: "/alumniapi/comands/saveBackup", action: "Guardar copia de seguridad", method: "GET" },
  { url: "/alumniapi/comands/downloadBackup", action: "Descargar backup", method: "GET" },
  { url: "/alumniapi/comands/reloadBD", action: "Reiniciar base de datos", method: "GET" },
  { url: "/alumniapi/comands/upload-backup", action: "Subir backup", method: "POST" },
];

export const loggerMiddleware = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const system = req.headers['user-agent'];

  const urlExcluded = urlFilter.some((f) => req.originalUrl?.includes(f));
  if (
    authHeader &&
    authHeader !== "Bearer null" &&
    !methodsToFilter.includes(req.method) &&
    !urlExcluded
  ) {
    const token = getHeaderToken(req);
    const user = await verifyJWT(token);

    try {
      const account = await Account.findOne({
        include: [
          {
            model: Roles,
            as: 'roles',
            through: { attributes: [] },
          },
          {
            model: Users,
            as: 'user',
          },
        ],
        where: { id: user.accountId },
      });

      const rolName = account.roles?.[0]?.name || "Rol desconocido";

      const matchedAction = actions.find(action => {
        const pattern = action.url.replace(/:[a-zA-Z0-9]+/g, '[a-zA-Z0-9]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(req.originalUrl) && action.method === req.method;
      });

      const actionText = matchedAction ? matchedAction.action : "Acción desconocida";

      logger({
        httpMethod: req.method,
        endPoint: req.originalUrl,
        action: actionText,
        description: `EL ${rolName} ${account.user.firstName} ${account.user.firstLastName} realizó una acción`,
        system: system
      });
    } catch (error) {
      console.error("Error al procesar la solicitud:", error);
    }
  }

  next();
};
