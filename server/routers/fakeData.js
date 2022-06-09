import express from "express";
import {
  changeCountryToCode,
  deleteFakePosts,
  fakeCommentOfPost,
  fakeLikeOfPost,
  fakePosts,
  fakeUsers,
} from "../controllers/fakeData.js";

const router = express.Router();

// router.get("/fakeData/country", changeCountryToCode);
// router.get("/fakeData/users", fakeUsers);
// router.get("/fakeData/posts", fakePosts);
// router.get("/fakeData/likePost", fakeLikeOfPost);
// router.get("/fakeData/commentPost", fakeCommentOfPost);
// router.get("/fakeData/posts/delete", deleteFakePosts);

export default router;
