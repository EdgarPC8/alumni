import { Router } from "express";
import {
  getNotificationsByAccount,
  createNotification,
  markAsSeen,
  deleteNotification,
  getUnreadCountByAccount,
} from "../controllers/NotificationsController.js";
import { isAuthenticated } from "../middlewares/authMiddelware.js";

const router = new Router();

router.get("/unreadCount", isAuthenticated, getUnreadCountByAccount);
router.get("/", isAuthenticated, getNotificationsByAccount);
router.post("", isAuthenticated,createNotification);
router.put("/seen/:id", isAuthenticated,markAsSeen);
router.delete("/:id", isAuthenticated,deleteNotification);

export default router;

