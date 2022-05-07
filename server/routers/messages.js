import express from "express";
import { createMessage, getMessages } from "../controllers/messages.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @route GET api/message
// @desc GET messages
router.get("/message/:conversationId", verifyToken, getMessages);

// @route POST api/message
// @desc Create new message
router.post("/message", verifyToken, createMessage);

export default router;
