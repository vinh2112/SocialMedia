import { PostModel } from "../models/PostModel.js";
import { ReportModel } from "../models/ReportModel.js";
import UserService from "../services/UserService.js";
import { deleteImageCloudinary } from "../utils/cloudinary.js";

export const getAllReports = async (req, res) => {
  try {
    const reports = await ReportModel.find({ isDeleted: false })
      .populate({ path: "reporterId", select: "name email avatar" })
      .populate({
        path: "reportedPostId",
        populate: {
          path: "userId",
          select: "name email avatar",
        },
      })
      .lean();

    const totalReports = await ReportModel.estimatedDocumentCount().lean();
    const deletedReports = await ReportModel.countDocuments({ isDeleted: true, typeDelete: true }).lean();
    const refusedReports = await ReportModel.countDocuments({ isDeleted: true, typeDelete: false }).lean();

    return res.status(200).json({
      reports: reports,
      totalReports,
      deletedReports,
      refusedReports,
    });
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
      await ReportModel.updateMany(
        { reportedPostId: report.reportedPostId },
        { $set: { isDeleted: true, typeDelete: true } }
      )
        .then(async () => {
          await PostModel.findById(report.reportedPostId.toString()).then(async (post) => {
            await deleteImageCloudinary(post.image.public_id);
            await post.deleteOne();
            await UserService.updateCountOfUser(report.reporterId, -1, -post.likes.length);
            return res.status(200).json(report.reportedPostId);
          });
        })
        .catch((err) => {
          return res.status(500).json({ msg: err.message });
        });
    }
    // await PostModel.findById("6266526610c2bdb553f4ca50").then((data) => {
    //   //DeleteOne
    //   return res.status(200).json(data);
    // });

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
      await ReportModel.findByIdAndUpdate(reportId, {
        $set: { isDeleted: true, typeDelete: false },
      })
        .then((result) => {
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
