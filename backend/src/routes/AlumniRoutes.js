import { Router } from "express";
import { getMatriz, getMatrizStats, addMatriz, editMatriz, deleteMatriz } from "../controllers/MatrizController.js";
import { getCareers,addCareer,editCareer,deleteCareer } from "../controllers/CareerController.js";
import { getPeriods,addPeriod,editPeriod ,deletePeriod} from "../controllers/PeriodController.js";
import { getMatriculas,addMatriculasBulk } from "../controllers/MatriculaController.js";
import { createAccountsFromMatriculas, filterUsers, filterAccounts, getEspecialidades, getPeriodosAcademicos } from "../controllers/AlumniController.js";


import { isAuthenticated } from "../middlewares/authMiddelware.js";


const router = new Router();

router.get("/createAccounts",createAccountsFromMatriculas);                             


router.post("/filterUsers", isAuthenticated, filterUsers);
router.post("/filterAccounts", isAuthenticated, filterAccounts);                             
router.get("/matricula", isAuthenticated,getMatriculas);                             
router.post("/matricula/bulk", isAuthenticated,addMatriculasBulk);                             
router.get("/matriz", isAuthenticated, getMatriz);
router.get("/matriz/stats", getMatrizStats);                             
router.post("/matriz", isAuthenticated,addMatriz);                             
router.put("/matriz/:id", isAuthenticated,editMatriz);                             
router.delete("/matriz/:id", isAuthenticated,deleteMatriz);                             
router.get("/career",isAuthenticated,getCareers);                             
router.post("/career", isAuthenticated,addCareer);                             
router.put("/career/:id", isAuthenticated,editCareer);                             
router.delete("/career/:id", isAuthenticated,deleteCareer);                             
router.get("/period", isAuthenticated,getPeriods);                             
router.post("/period", isAuthenticated,addPeriod);                             
router.put("/period/:id", isAuthenticated,editPeriod);                             
router.delete("/period/:id", isAuthenticated,deletePeriod);    
router.get("/matricula/especialidades", isAuthenticated,getEspecialidades);  
router.get("/matricula/periodosAcademicos", isAuthenticated,getPeriodosAcademicos); 




export default router;
