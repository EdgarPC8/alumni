import { Router } from "express";
import {
  getRoles,
  getOneUser,
  updateDataUser,
  changePassword,
  getUsers,
  addUser,
  deleteUser,
} from "../controllers/userController.js";
import {
  upload,
  uploadUpdatePhoto,
} from "../middlewares/uploadPhotoMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = new Router();

router.get("/roles", getRoles);
router.get("/:userId", isAuthenticated, getOneUser);
router.put("/:userId", isAuthenticated, uploadUpdatePhoto, updateDataUser);
router.put("/changePassword/:userId", isAuthenticated, changePassword);
router.post("/", isAuthenticated, upload, addUser);
router.get("/", isAuthenticated, getUsers);
router.delete("/:userId", isAuthenticated, deleteUser);

export default router;
