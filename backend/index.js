import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { sequelize } from "./src/database/connection.js";
import "./src/models/CV.js"; // CV + Professionals y asociaciones con Users
import "./src/models/UserData.js"; // Datos adicionales del usuario
import "./src/models/CvTemplate.js"; // Plantillas de CV para manejador
import "./src/models/PianoSong.js"; // Canciones del módulo Piano
import "./src/models/Alumni.js"; // Careers, Matriz, etc.
import "./src/models/Empresa.js"; // Bolsa de empleo - Empresa
import "./src/models/OfertaLaboral.js"; // Bolsa - Ofertas
import "./src/models/Postulacion.js"; // Bolsa - Postulaciones
import "./src/models/NotificationProgram.js";
import { insertData } from "./src/database/insertData.js";
import { loggerMiddleware } from "./src/middlewares/loggerMiddleware.js";

import UsersRoutes from "./src/routes/UsersRoutes.js";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import ComandsRoutes from "./src/routes/ComandsRoutes.js";
import AccountsRoutes from "./src/routes/AccountsRoutes.js";
import QuizRoutes from "./src/routes/QuizRoutes.js";
import FormsRoutes from "./src/routes/FormsRoutes.js";
import AlumniRoutes from "./src/routes/AlumniRoutes.js";
import CvRoutes from "./src/routes/cvRoutes.js";
import NotificationsRoutes from "./src/routes/NotificationsRoutes.js";
import NotificationProgramRoutes from "./src/routes/NotificationProgramRoutes.js";
import { startNotificationScheduler } from "./src/jobs/notificationScheduler.js";
import SmistmsRoutes from "./src/routes/SmistmsRoutes.js";
import BolsaEmpleoRoutes from "./src/routes/BolsaEmpleoRoutes.js";

import ImgRoutes from "./src/routes/ImgRoutes.js";
import FilesRoutes from "./src/routes/FilesRoutes.js";


import { initNotificationSocket } from "./src/sockets/notificationSocket.js";
import { Server } from "socket.io";
import { createServer } from "http";

// ✅ __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);
const api = "alumniapi";

const PORT = 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:8888",
  "http://192.168.1.100:8888",
  "http://192.168.1.101:8888",

  "http://192.168.1.101:5173",
  "http://192.168.1.100:5173",
  "https://aplicaciones.marianosamaniego.edu.ec",
  "https://www.aplicaciones.marianosamaniego.edu.ec",
];

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middleware
app.use(express.json());
app.use(loggerMiddleware);

// CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) callback(null, true);
    else callback(new Error("Acceso no permitido por CORS"));
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

app.use(`/${api}/img`, ImgRoutes);

app.use(`/${api}/img`, express.static(path.resolve(__dirname, "src/img")));
app.use(`/${api}/files`, FilesRoutes);

// Sirve los archivos guardados en src/files
app.use(`/${api}/files`, express.static(path.resolve(__dirname, "src/files")));


// ⚠️ Ya NO necesitas estas dos si todo estará bajo /img:
// app.use(`/${api}/photos`, express.static(`src/img/photos`));
// app.use(`/${api}/inventory/imgEdDeli`, express.static(`src/img/EdDeli`));

// ================================
// RESTO DE RUTAS
// ================================
//app.use(`/${api}/editor`, EditorRoutes);
//app.use(`/${api}/piano`, PianoRoutes);
//app.use(`/${api}/inventory`, InventoryControlRoutes);
//app.use(`/${api}/orders`, OrderRoutes);
//app.use(`/${api}/finance`, FinanceRoutes);
app.use(`/${api}/users`, UsersRoutes);
app.use(`/${api}/quiz`, QuizRoutes);
app.use(`/${api}`, AuthRoutes);
app.use(`/${api}/comands`, ComandsRoutes);
app.use(`/${api}`, AccountsRoutes);
app.use(`/${api}/forms`, FormsRoutes);
app.use(`/${api}/alumni`, AlumniRoutes);
app.use(`/${api}/smistms`, SmistmsRoutes);
app.use(`/${api}/cv`, CvRoutes);
app.use(`/${api}/notifications`, NotificationsRoutes);
app.use(`/${api}/notification-programs`, NotificationProgramRoutes);
app.use(`/${api}`, BolsaEmpleoRoutes);

// Socket para notificaciones
initNotificationSocket(io);
startNotificationScheduler();

export async function main() {
  try {
    await sequelize.authenticate();
    //await sequelize.sync({ alter: true }); // Añade columnas nuevas (imagen, imageUrl) si faltan
   /*  await sequelize.sync({ force: true });
     await insertData();   */


    console.log("✅ Conexión realizada con éxito.");

    httpServer.listen(PORT, () => {
      console.log(`🟢 Backend + Socket.IO escuchando en puerto ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Error en la conexión a la base de datos:", error);
  }
}

main();
