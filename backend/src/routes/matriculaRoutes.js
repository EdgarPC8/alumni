import { Router } from "express";
import {
    getAllStudents,
    getMatriculaFilter,
} from "../controllers/matriculaController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

import {
    addStudentsQuiz,
    deleteStudentQuiz,
    getStudentQuizFilter,
    getQuizzesStudent,
    verifyQuizCompletedStudent,
    addAnswersQuizStudent
} from "../controllers/studentsQuizController.js";


const router = Router();

router.get("/getAllStudents", isAuthenticated, getAllStudents);
router.post("/getMatriculaFilter", isAuthenticated, getMatriculaFilter);

router.post("/addStudentsQuiz", isAuthenticated, addStudentsQuiz);

router.delete("/:matriId/:quizId", isAuthenticated, deleteStudentQuiz);
router.get("/getStudentQuizFilter/:quizId", isAuthenticated, getStudentQuizFilter);

router.get(
    "/getQuizzesStudent/:studentId",
    isAuthenticated,
    getQuizzesStudent,
  );



// router.get("/one/:idQuiz", isAuthenticated, getOneQuiz);
router.get("/verifyQuizCompletedStudent", isAuthenticated, verifyQuizCompletedStudent);
// router.get("/chartDataQuiz/:idQuiz", isAuthenticated, getChartDataQuiz);
router.put("/addAnswersQuizStudent", isAuthenticated, addAnswersQuizStudent);


// router.put("/updateDataBase", isAuthenticated, updateDataBase);

// router.get("/getAllTutorials", isAuthenticated, getAllTutorials);
// router.post("/addTutorials", isAuthenticated, addTutorials);
// router.put("/editTutorials/:tutorialId", isAuthenticated, editTutorials);
// router.delete("/:tutorialsId", isAuthenticated, deleteTutorials);


export default router;
