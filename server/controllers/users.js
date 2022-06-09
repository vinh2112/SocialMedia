import { UserModel } from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import randomstring from "randomstring";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { auth } from "google-auth-library";
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

        var transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.PASSWORD_EMAIL,
          },
        });
        var mailOptions = {
          from: "photoos.sc@gmail.com",
          to: email,
          subject: "Recover your password from Photoos",
          html: `
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
          <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
              <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Photoos</a>
            </div>
            <p style="font-size:1.1em">Hi ${name},</p>
            <p>Thank you for choosing Photoos. Use the following deafult password to log into Photoos.</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${password}</h2>
            <p style="font-size:0.9em;">Regards,<br />Photoos</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
              <p>Your Brand Inc</p>
              <p>1600 Amphitheatre Parkway</p>
              <p>California</p>
            </div>
          </div>
        </div>
          `,
        };

        transporter.sendMail(mailOptions, async function (error, info) {
          if (error) {
            return await res.status(400).json({
              message: "Không thể gửi email ngay bây giờ. Vui lòng thử lại sau",
            });
          }
        });
        //

        // Create Token to Authentication/Authorization
        const accessToken = createAccessToken({ id: newUser._id });
        const refreshToken = createRefreshToken({ id: newUser._id });

        res.cookie("refreshtoken", refreshToken, {
          httpOnly: true,
          path: "/user/refresh_token",
        });

        return res.status(200).json({ accessToken });
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

      res.json({ accessToken });
    }
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
    if (!user) return res.status(200).json(false);
    else {
      const pinCode = randomstring.generate({ length: 4, charset: "numeric" });
      PINs.push({
        email: email,
        pin: pinCode,
      });

      var transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.PASSWORD_EMAIL,
        },
      });
      var mailOptions = {
        from: "Social Media Photoos",
        to: email,
        subject: "Recover your password from Photoos",
        html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Photoos</a>
          </div>
          <p style="font-size:1.1em">Hi ${user.fullName},</p>
          <p>Use the following PIN code to recover your password.</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${pinCode}</h2>
          <p style="font-size:0.9em;">Regards,<br />Photoos</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Your Brand Inc</p>
            <p>1600 Amphitheatre Parkway</p>
            <p>California</p>
          </div>
        </div>
      </div>
        `,
      };

      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          return await res.status(400).json({
            message: "Lỗi hệ thống",
          });
        } else {
          return res.status(200).json(true);
        }
      });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const checkPinCode = async (req, res) => {
  try {
    const { email, pin } = req.body;

    const isCorrect = PINs.some((obj) => obj.email === email && obj.pin === pin);

    if (!isCorrect) {
      return res.status(200).json(false);
    } else {
      return res.status(200).json(true);
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
  const { fullName, name, avatar, city, from, desc, password } = req.body;
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
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

  res.status(200).json("Updated user");
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

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
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

    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
    res.status(500).json({ msg: error.message });
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
    res.status(500).json({ msg: error.message });
  }

  res.status(200).json("Updated user");
};

// -------- Create Token Function ------------

const createAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5d" });
};

const createRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
