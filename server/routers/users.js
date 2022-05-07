import express from "express";
import {
  login,
  register,
  getUser,
  refreshToken,
  logout,
  interactUser,
  updateUser,
  getProfileUser,
  checkPassword,
  checkEmail,
  changePassword,
  checkPinCode,
  searchUsers,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

// @route GET user/
// @desc Check if user logged in
router.get("/", verifyToken, getUser);

// @route GET user/search?query=
// @desc Search users
router.get("/search", verifyToken, searchUsers);

// @route GET user/check_password
// @desc Check Password
router.get("/check_password", verifyToken, checkPassword);

router.post("/check_email", checkEmail);

router.post("/check_pincode", checkPinCode);

router.put("/change_password", changePassword);

// @route GET user/:userId
// @desc Get Profile User
router.get("/:userId/profile", getProfileUser);

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

// @route PUT user/
// @desc Update user
router.put("/", verifyToken, updateUser);

export default router;
