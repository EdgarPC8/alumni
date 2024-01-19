import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import professionalsRoutes from "./src/routes/professionalsRoutes.js";
import cvRoutes from "./src/routes/cvRoutes.js";
import quizRoutes from "./src/routes/quizRoutes.js";
import chartsRoutes from "./src/routes/chartsRoutes.js";
import linguiGeoRoutes from "./src/routes/linguisticsGeographyRoutes.js";
import cors from "cors";
import userRoutes from "./src/routes/userRoutes.js";
import registerRoutes from "./src/routes/registerRoutes.js";
import logRoutes from "./src/routes/logRoutes.js";
import { sequelize } from "./src/database/connection.js";
import { insertData } from "./src/database/insertData.js";

const app = express();
const PORT = 3000;

app.use(express.json());

const allowedOrigins = [
  // "http://dev.gym.com",
  "http://localhost",
  // "http://localhost:8888",
  "http://localhost:5173",
  // "http://192.168.137.250:5173",
  "http://192.169.100.250:5173",
  "http://192.168.137.250:8888",
  "http://aplicaciones.marianosamaniego.edu.ec"
];

const corsOptions = {
  origin: function (origin, callback) {
    // Verifica si el origen está en la lista de orígenes permitidos
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido por CORS"));
    }
  },
  optionsSuccessStatus: 200,
  credentials: true, // Permite el envío de cookies y encabezados de autenticación
};

app.use(cors(corsOptions));

app.use(express.json());

app.use("/photos", express.static("userPhotos"));

app.use("/api/auth", authRoutes);
app.use("/api/professionals", professionalsRoutes);
app.use("/api/cv", cvRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/linguiGeo", linguiGeoRoutes);
app.use("/api/users", userRoutes);
app.use("/api/charts", chartsRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/logs", logRoutes);

async function main() {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    // await insertData();
    console.log("Conección realizada con éxito.");
    app.listen(PORT, () => {
      console.log(`Backend escuchando en el puesto ${PORT}`);
    });
  } catch (error) {
    console.error("Error en la conexión en la db:", error);
  }
}

main();
