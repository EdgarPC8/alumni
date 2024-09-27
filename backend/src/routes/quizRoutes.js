import { Router } from "express";
import {
  getAllQuizzes,
  addQuiz,
  editQuiz,
  getOneQuiz,
  updateQuestionsQuiz,
  getQuizzesProfessional,
  addAnswersQuiz,
  verifyQuizCompleted,
  getChartDataQuiz,
} from "../controllers/quizController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = Router();

router.post("/addQuiz", isAuthenticated, addQuiz);
router.put("/updateQuestions/:idQuiz", isAuthenticated, updateQuestionsQuiz);
router.get("/allQuizzes", isAuthenticated, getAllQuizzes);
router.get("/one/:idQuiz", isAuthenticated, getOneQuiz);
router.get("/verifyQuizCompleted", isAuthenticated, verifyQuizCompleted);
router.get("/chartDataQuiz/:idQuiz", isAuthenticated, getChartDataQuiz);
router.put("/editQuiz/:idQuiz", isAuthenticated, editQuiz);
router.get(
  "/getQuizzesProfessional/:idProfessional",
  isAuthenticated,
  getQuizzesProfessional,
);

router.put("/addAnswersQuiz", isAuthenticated, addAnswersQuiz);




export default router;
