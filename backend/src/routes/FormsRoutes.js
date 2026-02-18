import { Router } from "express";
import {
    getForms,
    createForm,
    deleteForm,
    editForm,
    addQuestionsToForm,
    getFormById,
    getResponses,
    getFormsByAccountId,
    respondeForm,
    getQuestionsByForm,
    getAccountsByFormAssign,
    deleteAccountByFormAssign,
    assignAccountsToForm,
    cloneForm,
} from "../controllers/FormsController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = new Router();

// Admin
router.get("", isAuthenticated,getForms);                           //Ver todas las encuestas    
router.post("", isAuthenticated,createForm);                          //Crea la encuesta
router.delete("/:id", isAuthenticated,deleteForm);  //Elimina la encuesta
router.put("/:id", isAuthenticated,editForm);      //Edita la encuesta
router.post("/assign/:formId", isAuthenticated, assignAccountsToForm);
router.get("/assign/:formId", isAuthenticated, getAccountsByFormAssign);
router.delete("/assign/:formId/:accountId", isAuthenticated, deleteAccountByFormAssign);
router.get("/manage/:id", isAuthenticated,getQuestionsByForm);        //trae Preguntas del form por id
router.post("/manage/:id", isAuthenticated,addQuestionsToForm);  //Anade o edita preguntas
router.get("/:id", isAuthenticated,getFormById);  //Trae la info de la encuesta por id 
router.get("/clone/:formId", isAuthenticated,cloneForm);                         
router.get("/account/:accountId", isAuthenticated, getFormsByAccountId);      
router.get("/responses/:id", isAuthenticated,getResponses);         
router.post("/submit/:id", isAuthenticated,respondeForm);           

export default router;
