import express from "express";
import { getTotal, sendMail } from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/dashboard", getTotal);
router.post("/dashboard/send-mail", verifyToken, sendMail);

export default router;
