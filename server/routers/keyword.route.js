import express from "express";
import { getKeywords } from "../controllers/keyword.controller.js";

const router = express.Router();

router.get("/keyword", getKeywords);

export default router;
