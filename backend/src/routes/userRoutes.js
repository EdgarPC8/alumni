import { Router } from "express";
import {
  getRoles,
  getOneUser,
  updateUserProfile,
  changePassword,
  getUsers,
  addUser,
  deleteUser,
  updateUserData,
} from "../controllers/userController.js";
import {
  upload,
  uploadUpdatePhoto,
} from "../middlewares/uploadPhotoMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = new Router();

router.get("/roles", getRoles);
router.get("/:userId", isAuthenticated, getOneUser);
router.put("/:userId", isAuthenticated, uploadUpdatePhoto, updateUserData);
router.put(
  "/profile/:userId",
  isAuthenticated,
  uploadUpdatePhoto,
  updateUserProfile
);
router.put("/changePassword/:userId", isAuthenticated, changePassword);
router.post("/", isAuthenticated, upload, addUser);
router.get("/", isAuthenticated, getUsers);
router.delete("/:userId", isAuthenticated, deleteUser);

export default router;
