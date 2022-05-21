import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileupload from "express-fileupload";
import cors from "cors";
import mongoose from "mongoose";
import users from "./routers/users.js";
import posts from "./routers/posts.js";
import comments from "./routers/comments.js";
import upload from "./routers/upload.js";
import payments from "./routers/payments.js";
import aws from "./routers/aws.js";
import reports from "./routers/reports.js";
import dashboard from "./routers/dashboard.js";
import notifications from "./routers/notifications.js";
import messages from "./routers/messages.js";
import conversations from "./routers/conversations.js";
import fakeData from "./routers/fakeData.js";
import momo from "./routers/momo.js";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const URI = process.env.MONGODB_URL;

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(cors());

app.use(
  fileupload({
    useTempFiles: true,
  })
);

app.use("/user", users);
app.use("/api", aws);
app.use("/api", posts);
app.use("/api", comments);
app.use("/api", upload);
app.use("/api", payments);
app.use("/api", reports);
app.use("/api", dashboard);
app.use("/api", notifications);
app.use("/api", messages);
app.use("/api", conversations);
app.use("/api", fakeData);
app.use("/api", momo);

let onlineUsers = [];

const addNewUser = (userId, socketId) => {
  !onlineUsers.some((user) => user.userId === userId) && onlineUsers.push({ userId, socketId });
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUsers.find((user) => user.userId === userId);
};

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    var server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const io = new Server(server, {
      cors: {
        origin: "https://social-media-lv.netlify.app",
        credentials: true,
        withCredentials: true,
        // http://localhost:3000
      },
    });

    io.on("connection", (socket) => {
      socket.on("newUser", ({ userId }) => {
        addNewUser(userId, socket.id);
        io.emit("getOnlineUsers", {
          onlineUsers,
        });
      });

      socket.on("logoutUser", () => {
        removeUser(socket.id);
        io.emit("getOnlineUsers", {
          onlineUsers,
        });
      });

      socket.on("sendNotification", ({ userId }) => {
        const receiver = getUser(userId);
        io.to(receiver?.socketId).emit("getNotification");
      });

      // Comment Section

      socket.on("sendUpdateCommentPost", ({ postId }) => {
        io.emit("getUpdateCommentPost", {
          postId,
        });
      });

      socket.on("sendDeleteComment", ({ comment }) => {
        io.emit("getDeleteComment", {
          comment,
        });
      });

      socket.on("sendDeleteReply", ({ comment }) => {
        io.emit("getDeleteReply", {
          comment,
        });
      });

      //

      // Message Section

      socket.on("sendMessage", ({ receiverId, message }) => {
        const user = getUser(receiverId);

        io.to(user?.socketId).emit("getMessage", {
          message,
        });
      });

      //

      socket.on("sendOnlineUsers", () => {
        io.emit("getOnlineUsers", {
          onlineUsers,
        });
      });

      socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getOnlineUsers", {
          onlineUsers,
        });
      });
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
