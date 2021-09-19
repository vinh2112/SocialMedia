import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate User
    if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      return res.status(400).json({ msg: "Email format is incorrect." });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Incorrect Password." });

    // If login success, create access and refresh token
    const accessToken = createAccessToken({ id: user._id });
    const refreshToken = createRefreshToken({ id: user._id });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      path: "/user/refresh_token",
    });
    return res.json({ msg: "Logged out" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Validate User
    if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      return res.status(400).json({ msg: "Email format is incorrect." });

    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email is already existed." });

    if (password.length < 6)
      return res.status(400).json({ msg: "Password is at least 6 letters." });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, password: passwordHash, name });

    await newUser.save();

    // Create Token to Authentication/Authorization
    const accessToken = createAccessToken({ id: newUser._id });
    const refreshToken = createRefreshToken({ id: newUser._id });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      path: "/user/refresh_token",
    });

    res.json({ accessToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

export const refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;

    if (!rf_token) return res.status(400).json({ msg: "Please Login" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login" });
      const accessToken = createAccessToken({ id: user.id });

      res.json({ accessToken });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// Create Token Function

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "600s" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
