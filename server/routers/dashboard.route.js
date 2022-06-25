import express from "express";
import { getTotal } from "../controllers/dashboard.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/dashboard", getTotal);

export default router;
