import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    senders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    receivers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    type: {
      type: String,
      required: true,
    },
    targetLink: {
      type: String,
      max: 200,
    },
    content: {
      type: String,
      required: true,
    },
    seen: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model("Notification", schema);
