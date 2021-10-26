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
app.use("/api", posts);
app.use("/api", comments);
app.use("/api", upload);
app.use("/api", payments);

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("err", err);
  });
