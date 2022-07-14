import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import randomstring from "randomstring";
import dotenv from "dotenv";
import { auth } from "google-auth-library";
import MailService from "../services/mail.service.js";

const client = auth.fromAPIKey("AIzaSyBkYGbkbQMADdCkqTLqmYO8OZz4R9oH51A");

dotenv.config();

export const login = async (req, res) => {
  try {
    const { idToken } = req.body;

    // Validate User
    if (idToken) {
      const infoGoogle = await client.verifyIdToken({ idToken });
      const { email, name, picture } = infoGoogle.getPayload();

      const user = await UserModel.findOne({ email });
      if (!user) {
        const password = randomstring.generate({ length: 12 });
        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
          email,
          password: passwordHash,
          name: name,
          fullName: name,
          avatar: picture,
        });

        await newUser.save();

        // Send Password to Gmail

        var content = `
          <tr>
              <td class="esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l" bgcolor="#ffffff" align="left">
              <p>Thank you for choosing Photoos. Use the following deafult password to log into Photoos.</p>
              </td>
          </tr>
          <tr>
              <td class="esd-block-button es-p35t es-p35b es-p10r es-p10l" align="center"><span class="es-button-border">
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${password}</h2>
                  </span></td>
          </tr>
        `;

        await MailService.sendMail("Photoos", email, "Welcome to Photoos!", content)
          .then(() => {
            // Create Token to Authentication/Authorization
            const accessToken = createAccessToken({ id: newUser._id });
            const refreshToken = createRefreshToken({ id: newUser._id });

            res.cookie("refreshtoken", refreshToken, {
              httpOnly: true,
              path: "/user/refresh_token",
            });

            return res.status(200).json({ accessToken });
          })
          .catch((error) => {
            return res.status(500).json(error);
          });

        //
      }

      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      return res.status(200).json({ accessToken });
    } else {
      const { email, password } = req.body;

      if (
        !email.match(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
        return res.status(400).json({ msg: "Email format is incorrect." });

      const user = await UserModel.findOne({ email });
      if (!user) return res.status(403).json({ msg: "User does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password." });

      // If login success, create access and refresh token
      const accessToken = createAccessToken({ id: user._id });
      const refreshToken = createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });

      return res.status(200).json({ accessToken });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("refreshtoken", {
      httpOnly: true,
      path: "/user/refresh_token",
    });
    return res.status(200).json({ msg: "Logged out" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

let PINs = [];
export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    // Validate User
    if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      return res.status(400).json({ msg: "Email format is incorrect." });

    const user = await UserModel.findOne({ email });
    if (!user) return res.status(200).json({ status: "fail" });
    else {
      const pinCode = randomstring.generate({ length: 4, charset: "numeric" });
      PINs.push({
        email: email,
        pin: pinCode,
      });

      var content = `
      <tr>
          <td class="esd-block-text es-p20t es-p20b es-p30r es-p30l es-m-txt-l" bgcolor="#ffffff" align="left">
              <p>Use the following PIN code to recover your password.</p>
          </td>
      </tr>
      <tr>
          <td class="esd-block-button es-p35t es-p35b es-p10r es-p10l" align="center"><span class="es-button-border">
                  <div class="es-button es-button-1655554825297" style="display: inline-block; background: #fe3456; color: #fff; padding: 10px 15px; font-size: 1.4rem; letter-spacing: 2px; font-weight: 700">${pinCode}</div>
              </span></td>
      </tr>
      `;

      await MailService.sendMail("Photoos", email, "Recover Photoos's password", content)
        .then((result) => {
          return res.status(200).json({ status: "success" });
        })
        .catch((error) => {
          return res.status(500).json(error);
        });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const checkPinCode = async (req, res) => {
  try {
    const { email, pin } = req.body;

    const isCorrect = PINs.some((obj) => obj.email === email && obj.pin === pin);

    if (!isCorrect) {
      return res.status(200).json({ status: "fail" });
    } else {
      return res.status(200).json({ status: "success" });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const { email, password, name, fullName, avatar } = req.body;

    // Validate User
    if (
      !email.match(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      return res.status(400).json({ msg: "Email format is incorrect." });

    const user = await UserModel.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email is already existed." });

    if (password.length < 6) return res.status(400).json({ msg: "Password is at least 6 letters." });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, password: passwordHash, name, fullName, avatar });

    await newUser.save();

    return res.status(200).json({ status: "success" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const searchUsers = async (req, res) => {
  const { query } = req.query;

  try {
    const users = await UserModel.find({ $text: { $search: query } });

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateUser = async (req, res) => {
  const { fullName, name, avatar, city, from, desc, password, wallet } = req.body;
  // Check Password and Hash Password
  var newPassword;
  if (password) {
    if (password.length < 6) return res.status(400).json({ msg: "Password must have at least 6 letters." });
    try {
      newPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  try {
    await UserModel.findByIdAndUpdate(req.userId, {
      password: newPassword,
      name: name,
      fullName: fullName,
      avatar: avatar,
      city: city,
      from: from,
      desc: desc,
      $inc: { wallet: wallet },
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

  return res.status(200).json("Updated user");
};

export const refreshToken = (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;

    if (!rf_token) return res.status(400).json({ msg: "Please Login" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login" });

      const accessToken = createAccessToken({ id: user.id });

      return res.json({ accessToken });
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId)
      .populate({
        path: "followers",
        select: "fullName name email avatar",
      })
      .populate({
        path: "followings",
        select: "fullName name email avatar",
      })
      .select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getProfileUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId)
      .populate({
        path: "followers",
        select: "fullName name email avatar",
      })
      .populate({
        path: "followings",
        select: "fullName name email avatar",
      })
      .select("-password");
    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const interactUser = async (req, res) => {
  try {
    if (req.userId !== req.params.userId) {
      try {
        const user = await UserModel.findById(req.params.userId);
        const currentUser = await UserModel.findById(req.userId);

        if (!user.followers.includes(req.userId)) {
          const newUser = await UserModel.findOneAndUpdate({ _id: user._id }, { $push: { followers: req.userId } }, { new: true })
            .populate({
              path: "followers",
              select: "fullName name email avatar",
            })
            .populate({
              path: "followings",
              select: "fullName name email avatar",
            });

          await UserModel.findOneAndUpdate({ _id: currentUser._id }, { $push: { followings: req.params.userId } }, { new: true });

          return res.status(200).json(newUser);
        } else {
          const newUser = await UserModel.findOneAndUpdate({ _id: user._id }, { $pull: { followers: req.userId } }, { new: true })
            .populate({
              path: "followers",
              select: "fullName name email avatar",
            })
            .populate({
              path: "followings",
              select: "fullName name email avatar",
            });

          await UserModel.findOneAndUpdate({ _id: currentUser._id }, { $pull: { followings: req.params.userId } }, { new: true });

          return res.status(200).json(newUser);
        }
      } catch (error) {
        return res.status(500).json({ msg: error.message });
      }
    } else {
      return res.status(400).json({ msg: "You can not follow yourself." });
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const checkPassword = async (req, res) => {
  try {
    const { password } = req.query;
    const user = await UserModel.findById(req.userId).select("password").lean();
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) return res.status(200).json(true);
      else return res.status(200).json(false);
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const changePassword = async (req, res) => {
  const { email, password } = req.body;
  // Check Password and Hash Password
  var newPassword;
  if (password) {
    if (password.length < 6) return res.status(400).json({ msg: "Password must have at least 6 letters." });
    try {
      newPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  try {
    await UserModel.findOneAndUpdate(
      { email: email },
      {
        password: newPassword,
      }
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }

  return res.status(200).json({ status: "success" });
};

// -------- Create Token Function ------------

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
