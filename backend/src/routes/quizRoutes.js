import { Router } from "express";
import {
  addResponses,
  getAllResponses,
  editResponses,
  deleteResponses,
} from "../controllers/quizController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = Router();

router.post("/addResponses", isAuthenticated, addResponses);
router.get("/getAllResponses", isAuthenticated, getAllResponses);
router.put("/editResponses", isAuthenticated, editResponses);
router.delete("/deleteResponses/:responseId", isAuthenticated, deleteResponses);

// router.post("/", addLanguages);

export default router;
