import express from "express";
import {
  createNotification,
  getNotificationsByUserId,
  seenNotification,
} from "../controllers/notifications.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @router GET /api/noti
// @desc Get all user's notifications
router.get("/noti", verifyToken, getNotificationsByUserId);

// @router POST /api/noti
// @desc Create Notification
router.post("/noti", verifyToken, createNotification);

// @router PUT /api/noti
// @desc Update status Notification
router.put("/noti", verifyToken, seenNotification);

export default router;
