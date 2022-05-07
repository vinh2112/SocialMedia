import express from "express";
import { deleteFakePosts, fakePosts, fakeUsers } from "../controllers/fakeData.js";

const router = express.Router();

router.get("/fakeData/users", fakeUsers);
router.get("/fakeData/posts", fakePosts);
// router.get("/fakeData/posts/delete", deleteFakePosts);

export default router;
