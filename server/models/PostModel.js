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
    image: {
      type: Object,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isPaymentRequired: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const PostModel = mongoose.model("Post", schema);
