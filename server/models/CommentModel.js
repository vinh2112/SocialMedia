import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    comment: {
      type: String,
      max: 300,
    },
    reply: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        replyComment: {
          type: String,
          max: 200,
        },
      },
    ],
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", schema);
