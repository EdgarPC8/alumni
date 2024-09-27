import { Router } from "express";
import {
    getAllStudents,
} from "../controllers/studentsController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";


const router = Router();

router.get("/getAllStudents", isAuthenticated, getAllStudents);
// router.put("/updateDataBase", isAuthenticated, updateDataBase);

// router.get("/getAllTutorials", isAuthenticated, getAllTutorials);
// router.post("/addTutorials", isAuthenticated, addTutorials);
// router.put("/editTutorials/:tutorialId", isAuthenticated, editTutorials);
// router.delete("/:tutorialsId", isAuthenticated, deleteTutorials);


export default router;
