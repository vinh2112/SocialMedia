import { PostModel } from "../models/PostModel.js";
import { ReportModel } from "../models/ReportModel.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await ReportModel.find({})
      .populate({ path: "reporterId", select: "name email avatar" })
      .populate({
        path: "reportedPostId",
        populate: {
          path: "userId",
          select: "name email avatar",
        },
      })
      .sort("-createdAt");
    return res.status(200).json(reports);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createReport = async (req, res) => {
  try {
    const { postId, reason } = req.body;
    const post = await PostModel.findById(postId);
    if (!post) return res.status(500).json({ msg: "Post is not exist" });

    const report = await ReportModel.find({ reporterId: req.userId, reportedPostId: postId });
    if (report.length) return res.status(400).json({ msg: "Report is existed" });
    const newReport = new ReportModel({
      reporterId: req.userId,
      reason,
      reportedPostId: postId,
    });
    await newReport.save();
    return res.status(200).json({ msg: "Reported Success" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteReportedPost = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await ReportModel.findById(reportId);

    if (report) {
      await ReportModel.deleteMany({ reportedPostId: report.reportedPostId })
        .then(async () => {
          await PostModel.findByIdAndDelete(report.reportedPostId.toString());
          return res.status(200).json(report.reportedPostId);
        })
        .catch((err) => {
          return res.status(500).json({ msg: err.message });
        });
    }

    return res.status(500).json({ msg: "Report not found!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const refuseReportedPost = async (req, res) => {
  try {
    const { reportId } = req.params;
    const report = await ReportModel.findById(reportId);

    if (report) {
      await ReportModel.findByIdAndDelete(reportId)
        .then(() => {
          return res.status(200).json({ msg: "success" });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err.message });
        });
    }

    return res.status(500).json({ msg: "Report not found!" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
