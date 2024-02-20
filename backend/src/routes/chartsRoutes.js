import { Router } from "express";
import {
  getProfesionalsCareers,
  getAllResponses,
} from "../controllers/chartsController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = Router();
router.get("/getProfesionalsCareers", isAuthenticated, getProfesionalsCareers);
router.get("/getAllResponses/:quizId", isAuthenticated, getAllResponses);

// router.post("/", addLanguages);

export default router;
