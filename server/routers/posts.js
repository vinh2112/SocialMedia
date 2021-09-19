import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  getProfilePost,
  reactPost,
  updatePost,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @router GET api/post
// @desc Get all posts
router.get("/post", getPosts);

// @router GET api/post/:postId
// @desc Get a post
router.get("/post/:postId", getPost);

//@router GET api/profile/post
//@desc Get user's all posts
router.get("/profile/post/:userId", getProfilePost);

// @router POST api/post
// @desc Create new post
router.post("/post", verifyToken, createPost);

// @router PUT api/post/:postId/react
// @desc React Post
router.put("/post/:postId/react", verifyToken, reactPost);

// @router PUT api/post/:postId
// @desc Edit Post
router.put("/post/:postId", verifyToken, updatePost);

// @router DELETE api/post/:postId
// @desc Delete post
router.delete("/post/:postId", verifyToken, deletePost);

export default router;
