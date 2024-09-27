import { Router } from "express";
import {
  getAllProfessionals,
  addProfessional,
  getProfessionalsById,
  editProfessional,
  deleteProfessionals,
} from "../controllers/ProfessionalsControllers.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = Router();

router.get("/getAllProfessionals", isAuthenticated, getAllProfessionals);
router.get(
  "/getProfessionalsById/:userId",
  isAuthenticated,
  getProfessionalsById
);
router.post("/addProfessionals", isAuthenticated, addProfessional);
router.put("/editProfessionals/:professionalId", isAuthenticated, editProfessional);
router.delete("/deleteProfessionals/:userId", isAuthenticated, deleteProfessionals);


export default router;
