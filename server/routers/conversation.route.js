import express from "express";
import { createConversation, findConversation, getConversationsByUserId } from "../controllers/conversation.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @router GET /api/conversation
// @desc Get all conversations of user
router.get("/conversation", verifyToken, getConversationsByUserId);

// @router POST /api/conversation
// @desc Create new conversation
router.post("/conversation", verifyToken, createConversation);

// @router GET /api/conversation/:receiverId
// @desc Get conversation of 2 user
router.get("/conversation/:receiverId", verifyToken, findConversation);

export default router;
