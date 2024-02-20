import { Router } from "express";
import {
  getAllMatriz,
  addMatriz,
  deleteMatriz,
  getAllCareers,
getAllPeriods,
addCareer,
addPeriod,
editCareer,
editPeriod,
getMatrizFilter,
addMatrizQuiz,
getMatrizQuizFilter,
deleteMatrizQuiz,
getQuizByMatrizProfessional,
completedQuiz,
} from "../controllers/matrizController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = Router();

router.get("/getQuizByMatrizProfessional/:idProfessional", isAuthenticated, getQuizByMatrizProfessional);
router.get("/getAllCareers", isAuthenticated, getAllCareers);
router.get("/getAllPeriods", isAuthenticated, getAllPeriods);
router.get("/getAllMatriz", isAuthenticated, getAllMatriz);
router.post("/getMatrizFilter", isAuthenticated, getMatrizFilter);
router.get("/getMatrizQuizFilter/:quizId", isAuthenticated, getMatrizQuizFilter);
router.post("/addMatriz", isAuthenticated, addMatriz);
router.post("/addMatrizQuiz", isAuthenticated, addMatrizQuiz);
router.post("/addCareer", isAuthenticated, addCareer);
router.post("/addPeriod", isAuthenticated, addPeriod);

router.delete("/:matrizId", isAuthenticated, deleteMatriz);
router.delete("/:matrizId/:quizId", isAuthenticated, deleteMatrizQuiz);
// router.put("/completedQuiz/:matrizId/:quizId", isAuthenticated, completedQuiz);
router.put("/completedQuiz", isAuthenticated, completedQuiz);
router.put("/editCareer/:careerId", isAuthenticated, editCareer);
router.put("/editPeriod/:periodId", isAuthenticated, editPeriod);

// router.post("/uploadCSV", isAuthenticated, uploadFileMiddleware, (req, res) => {
//   res.json({ message: "Archivo CSV cargado con éxito." });
// });




export default router;
