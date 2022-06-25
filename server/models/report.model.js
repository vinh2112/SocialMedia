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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    typeDelete: {
      type: Boolean, // true is delete, false is refuse
    },
  },
  { timestamps: true }
);

export const ReportModel = mongoose.model("Report", schema);
