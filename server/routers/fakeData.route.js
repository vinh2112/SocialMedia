import express from "express";
import {
  changeCountryToCode,
  deleteFakePosts,
  fakeCommentOfPost,
  fakeLikeOfPost,
  fakePosts,
  fakeUsers,
  updateUserInfo,
} from "../controllers/fakeData.controller.js";

const router = express.Router();

// router.get("/fakeData/country", changeCountryToCode);
// router.get("/fakeData/users", fakeUsers);
// router.get("/fakeData/posts", fakePosts);
// router.get("/fakeData/likePost", fakeLikeOfPost);
// router.get("/fakeData/commentPost", fakeCommentOfPost);
// router.get("/fakeData/posts/delete", deleteFakePosts);
router.get("/fakeData/update", updateUserInfo);

export default router;
