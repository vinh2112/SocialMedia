import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    desc: {
      type: String,
      max: 500,
      trim: true,
    },
    category: {
      type: Array,
      default: [],
    },
    images: {
      type: String,
      trim: true,
    },
    likes: {
      type: Array,
      default: [],
    },
    isPaymentRequired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", schema);
