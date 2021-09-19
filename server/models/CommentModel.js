import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostModel",
    },
    comment: {
      type: String,
      max: 300,
    },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", schema);
