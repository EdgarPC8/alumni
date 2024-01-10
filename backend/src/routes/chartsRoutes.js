import { Router } from "express";
import {
  getProfesionalsCareers,
} from "../controllers/chartsController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = Router();
router.get("/getProfesionalsCareers", isAuthenticated, getProfesionalsCareers);

// router.post("/", addLanguages);

export default router;
