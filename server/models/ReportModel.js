import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reportedPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    reason: {
      type: String,
    },
  },
  { timestamps: true }
);

export const ReportModel = mongoose.model("Report", schema);
