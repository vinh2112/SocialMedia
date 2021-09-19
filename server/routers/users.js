import express from "express";
import {
  login,
  register,
  getUser,
  refreshToken,
  logout,
  interactUser,
  updateUser,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @route GET user/
// @desc Check if user logged in
router.get("/", verifyToken, getUser);

// @route GET user/refresh_token
// @desc Refresh new token for user's request
router.get("/refresh_token", refreshToken);

// @route GET user/logout
// @desc Logout user
router.get("/logout", logout);

// @route POST user/login
// @desc Login user
router.post("/login", login);

// @route POST user/register
// @desc Register new user
router.post("/register", register);

// @route PUT user/:userId/interact
// @desc Follow/Unfollow user
router.put("/:userId/interact", verifyToken, interactUser);

// @route PUT user/:userId
// @desc Update user
router.put("/:userId", verifyToken, updateUser);

export default router;
