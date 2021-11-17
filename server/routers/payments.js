import express from "express";
import { checkPayment, createPayment } from "../controllers/payments.js";

import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @router POST api/payment
// @desc Create new payment
router.post("/payment/:postId", verifyToken, createPayment);

// @router GET api/payment/:postId
// @desc Check payment
router.get("/payment/:postId", verifyToken, checkPayment);
export default router;
