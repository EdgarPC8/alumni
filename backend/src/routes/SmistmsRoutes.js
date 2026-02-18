import { Router } from "express";
import { loginSmistms } from "../controllers/SmistmsController.js";

const router = Router();

// Todo lo que venga del sistema SMISTMS (GAISTMS): login externo
router.post("/login", loginSmistms);

export default router;
