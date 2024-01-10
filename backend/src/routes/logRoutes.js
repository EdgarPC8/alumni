import { Router } from "express";
import { isAuthenticated } from "../middlewares/authMiddelware.js";
import { getLogs } from "../controllers/logController.js";

const router = Router();

router.get("/", isAuthenticated, getLogs);

export default router;
