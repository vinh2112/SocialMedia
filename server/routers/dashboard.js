import express from "express";
import { getDataCountOfUser, getTotal } from "../controllers/dashboard.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/dashboard", getTotal);

router.get("/dashboard/user", getDataCountOfUser);

export default router;
