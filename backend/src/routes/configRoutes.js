import { Router } from "express";
import {
    backup,
} from "../controllers/configController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = Router();

router.get("/backup", isAuthenticated, backup);

export default router;
