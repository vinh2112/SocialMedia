import express from "express";
import { createNotification, getNotifications, seenNotification } from "../controllers/notification.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @router GET /api/noti
// @desc Get all user's notifications
router.get("/noti", verifyToken, getNotifications);

// @router POST /api/noti
// @desc Create Notification
router.post("/noti", verifyToken, createNotification);

// @router PUT /api/noti
// @desc Update status Notification
router.put("/noti", verifyToken, seenNotification);

export default router;
