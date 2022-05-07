import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: mongoose.Schema.Types.Number,
      default: 0,
    },
    /*
      tpye === 0 like post
      type === 1 comment post
      type === 2 follow user
    */
    targetId: {
      type: String,
      max: 200,
    },
    seen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model("Notification", schema);
