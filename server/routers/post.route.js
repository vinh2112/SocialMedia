import express from "express";
import {
  createPost,
  getPost,
  getPosts,
  getProfilePost,
  getPostsTimeline,
  reactPost,
  updatePost,
  deletePost,
  searchPosts,
  getTopLikedPosts,
  getRelativePosts,
  downloadPhotoPost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @router GET api/post/search
// @desc Get posts by search value
router.get("/post/search", searchPosts);

// router.get("/post/watermark", watermarkPost);

//@router GET api/post/timeline
//@desc Get timeline posts
router.get("/post/timeline", verifyToken, getPostsTimeline);

// @router GET api/post
// @desc Get all posts
router.get("/post", getPosts);

// @router GET api/post/:id/relative
// @desc Get relative posts
router.get("/post/:id/relative", getRelativePosts);

// @router GET api/post/top_liked
// @desc Get Top Liked Posts
router.get("/post/top_liked", getTopLikedPosts);

// @router GET api/post/:postId
// @desc Get a post
router.get("/post/:postId", getPost);

// @router GET api/post/profile/:userId
// @desc Get user's all posts
router.get("/post/profile/:userId", getProfilePost);

// @router GET api/post/:postId/download
router.get("/post/:postId/download", verifyToken, downloadPhotoPost);

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
