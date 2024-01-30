import { Router } from "express";
import {
  addAcademicTraining,
  editAcademicTraining,
  getAllAcademicTraining,
  deleteAcademicTraining,
  addTeachingExperience,
  editTeachingExperience,
  getAllTeachingExperience,
  deleteTeachingExperience,
  addCoursesWorkshops,
  editCoursesWorkshops,
  getAllCoursesWorkshops,
  deleteCoursesWorkshops,
  addIntellectualProduction,
  editIntellectualProduction,
  getAllIntellectualProduction,
  deleteIntellectualProduction,
  addBooks,
  editBooks,
  getAllBooks,
  deleteBooks,
  addAcademicProfessionalMerits,
  editAcademicProfessionalMerits,
  getAllAcademicProfessionalMerits,
  deleteAcademicProfessionalMerits,
  addLanguages,
  editLanguages,
  getAllLanguages,
  deleteLanguages,
  addProfessionalExperience,
  editProfessionalExperience,
  getAllProfessionalExperience,
  deleteProfessionalExperience,
  getProfessionalExperienceById,
  getLanguagesById,
  getAcademicProfessionalMeritsById,
  getAcademicTrainingById,
  getTeachingExperienceById,
  getCoursesWorkshopsById,
  getIntellectualProductionById,
  getBooksById,
} from "../controllers/cvController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";
// import  loggerMiddleware from "../middlewares/loggerMiddleware.js";


const router = Router();
// router.use(loggerMiddleware)


router.post("/addProfessionalExperience",isAuthenticated,addProfessionalExperience);
router.get("/getAllProfessionalExperience",isAuthenticated,getAllProfessionalExperience);
router.put("/editProfessionalExperience/:experienceId",isAuthenticated,editProfessionalExperience);
router.delete("/deleteProfessionalExperience/:experienceId",isAuthenticated,deleteProfessionalExperience);
router.get("/getProfessionalExperienceById/:experienceId",isAuthenticated,getProfessionalExperienceById);


router.post("/addLanguages", isAuthenticated, addLanguages);
router.get("/getAllLanguages", isAuthenticated, getAllLanguages);
router.put("/editLanguages/:languageId", isAuthenticated, editLanguages);
router.delete("/deleteLanguages/:languageId", isAuthenticated, deleteLanguages);
router.get("/getLanguagesById/:languageId",isAuthenticated,getLanguagesById);


router.post("/addAcademicProfessionalMerits",isAuthenticated,addAcademicProfessionalMerits);
router.get("/getAllAcademicProfessionalMerits",isAuthenticated,getAllAcademicProfessionalMerits);
router.put("/editAcademicProfessionalMerits/:meritId",isAuthenticated,editAcademicProfessionalMerits);
router.delete("/deleteAcademicProfessionalMerits/:meritId",isAuthenticated,deleteAcademicProfessionalMerits);
router.get("/getAcademicProfessionalMeritsById/:meritId",isAuthenticated,getAcademicProfessionalMeritsById);


router.post("/addAcademicTraining", isAuthenticated, addAcademicTraining);
router.get("/getAllAcademicTraining", isAuthenticated, getAllAcademicTraining);
router.put("/editAcademicTraining/:academicId",isAuthenticated,editAcademicTraining);
router.delete("/deleteAcademicTraining/:academicId",isAuthenticated,deleteAcademicTraining);
router.get("/getAcademicTrainingById/:academicId",isAuthenticated,getAcademicTrainingById);


router.post("/addTeachingExperience", isAuthenticated, addTeachingExperience);
router.get("/getAllTeachingExperience",isAuthenticated,getAllTeachingExperience);
router.put("/editTeachingExperience/:teachingId",isAuthenticated,editTeachingExperience);
router.delete("/deleteTeachingExperience/:teachingId",deleteTeachingExperience);
router.get("/getTeachingExperienceById/:teachingId",isAuthenticated,getTeachingExperienceById);


router.post("/addCoursesWorkshops", isAuthenticated, addCoursesWorkshops);
router.get("/getAllCoursesWorkshops", isAuthenticated, getAllCoursesWorkshops);
router.put("/editCoursesWorkshops/:courseId",isAuthenticated,editCoursesWorkshops);
router.delete("/deleteCoursesWorkshops/:courseId",isAuthenticated,deleteCoursesWorkshops);
router.get("/getCoursesWorkshopsById/:courseId",isAuthenticated,getCoursesWorkshopsById);


router.post("/addIntellectualProduction",isAuthenticated,addIntellectualProduction);
router.get("/getAllIntellectualProduction",isAuthenticated,getAllIntellectualProduction);
router.put("/editIntellectualProduction/:intellectualId",isAuthenticated,editIntellectualProduction);
router.delete("/deleteIntellectualProduction/:intellectualId",isAuthenticated,deleteIntellectualProduction);
router.get("/getIntellectualProductionById/:intellectualId",isAuthenticated,getIntellectualProductionById);


router.post("/addBooks", isAuthenticated, addBooks);
router.get("/getAllBooks", isAuthenticated, getAllBooks);
router.put("/editBooks/:bookId", isAuthenticated, editBooks);
router.delete("/deleteBooks/:bookId", isAuthenticated, deleteBooks);
router.get("/getBooksById/:bookId",isAuthenticated,getBooksById);








export default router;
