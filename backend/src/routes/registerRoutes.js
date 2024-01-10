import { Router } from "express";
import {
  registerUser
} from "../controllers/registerController.js";
import {
  upload,
  uploadUpdatePhoto,
} from "../middlewares/uploadPhotoMiddleware.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = new Router();

router.post("/",registerUser);

export default router;
