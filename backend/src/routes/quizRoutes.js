import { Router } from "express";
import {
  addResponses,
  getAllResponses,
  editResponses,
  deleteResponses,
  getAllQuizzes,
  addQuiz,
} from "../controllers/quizController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = Router();

router.post("/addResponses", isAuthenticated, addResponses);
router.post("/addQuiz", isAuthenticated, addQuiz);
router.get("/getAllResponses", isAuthenticated, getAllResponses);
router.get("/getAllQuizzes", isAuthenticated, getAllQuizzes);
router.put("/editResponses", isAuthenticated, editResponses);
router.delete("/deleteResponses/:responseId", isAuthenticated, deleteResponses);

// router.post("/", addLanguages);

export default router;
