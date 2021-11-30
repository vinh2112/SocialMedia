import express from "express";
import {
  createReport,
  getAllReports,
  deleteReportedPost,
  refuseReportedPost,
} from "../controllers/reports.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.get("/report", getAllReports);

router.post("/report", verifyToken, createReport);

router.delete("/report/:reportId", verifyToken, deleteReportedPost);

router.delete("/report/:reportId/refuse", verifyToken, refuseReportedPost);
export default router;
