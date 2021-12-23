import { PostModel } from "../models/PostModel.js";
import { UserModel } from "../models/UserModel.js";
import { ReportModel } from "../models/ReportModel.js";

export const getTotal = async (req, res) => {
  try {
    const posts = await PostModel.find();
    const users = await UserModel.find();
    const reports = await ReportModel.find();

    return res
      .status(200)
      .json({ totalPosts: posts.length, totalUsers: users.length, totalReports: reports.length });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
