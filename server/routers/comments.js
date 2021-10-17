import express from "express";
import {
  getCommentPost,
  createComment,
  replyComment,
  deleteReplyComment,
  updateComment,
  deleteComment,
} from "../controllers/comments.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @router GET /api/comment/:postId
// @desc Get comment in post
router.get("/comment/:postId", getCommentPost);

// @router POST /api/comment
// @desc Create new comment
router.post("/comment", verifyToken, createComment);

// @router PUT /api/comment/:commentId
// @desc Update comment
router.put("/comment/:commentId", verifyToken, updateComment);

// @router PUT /api/comment/:commentId
// @desc Delete comment
router.delete("/comment/:commentId", verifyToken, deleteComment);

// @router PUT /api/comment/:commentId/reply
// @desc Update reply comment in post
router.put("/comment/:commentId/reply", verifyToken, replyComment);

// @router PUT /api/comment/:commentId/reply
// @desc Delete reply comment in post
router.delete("/comment/:commentId/reply", verifyToken, deleteReplyComment);

export default router;
