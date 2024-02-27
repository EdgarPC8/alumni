import { Router } from "express";
import {
    backup,
    getAllTutorials,
addTutorials,
editTutorials,
deleteTutorials,
updateDataBase,
} from "../controllers/configController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";


const router = Router();

router.get("/backup", isAuthenticated, backup);
router.put("/updateDataBase", isAuthenticated, updateDataBase);

router.get("/getAllTutorials", isAuthenticated, getAllTutorials);
router.post("/addTutorials", isAuthenticated, addTutorials);
router.put("/editTutorials/:tutorialId", isAuthenticated, editTutorials);
router.delete("/:tutorialsId", isAuthenticated, deleteTutorials);


export default router;
