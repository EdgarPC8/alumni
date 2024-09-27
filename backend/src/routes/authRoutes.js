import { Router } from "express";
import { login, verifytoken,loginExternal } from "../controllers/authController.js";

const router = Router();

router.post("/login", login);
router.post("/loginExternal", loginExternal);
router.get("/verifytoken", verifytoken);

export default router;
