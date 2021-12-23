import express from "express";
import { getTotal } from "../controllers/dashboard.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getTotal);

export default router;
