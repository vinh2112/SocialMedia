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
    price: {
      type: Number,
      default: 0,
    },
    isSuccess: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const PaymentModel = mongoose.model("Payment", schema);
