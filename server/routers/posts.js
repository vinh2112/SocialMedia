import express from "express";
import { createPost, getPosts } from "../controllers/posts.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @router GET api/post
// @desc Get all posts
router.get("/post", getPosts);

// @router POST api/post
// @desc Create new post
router.post("/post", verifyToken, createPost);

export default router;
