import { PostModel } from "../models/post.model.js";
import { UserModel } from "../models/user.model.js";
import { ReportModel } from "../models/report.model.js";
import { KeywordModel } from "../models/keyword.model.js";
import { CommentModel } from "../models/comment.model.js";
import MailService from "../services/mail.service.js";

export const getTotal = async (req, res) => {
  try {
    const posts = await PostModel.estimatedDocumentCount().lean();
    const keywords = await KeywordModel.estimatedDocumentCount().lean();
    const reports = await ReportModel.countDocuments({ isDeleted: false }).lean();
    const users = await getUserData();

    // let keywords = [];
    // for await (const post of posts) {
    //   keywords = [...new Map([...keywords, ...post.category].map((item) => [item, item])).values()];
    // }

    const userChart = await getUserCountByMonth();
    const reportData = await getReportData();

    return res.status(200).json({
      totalPosts: posts,
      totalUsers: users.length,
      totalReports: reports,
      totalKeywords: keywords,
      userChart,
      userData: users,
      reportData,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

async function getUserCountByMonth() {
  try {
    /*  Get list month in range currnent+-3
     *  Then base on this list month count users
     */
    let currentMonth = new Date().getUTCMonth();

    let listMonths = [];
    for (let i = -6; i <= 1; i++) {
      const month = new Date(
        new Date(new Date(new Date().setUTCHours(0, 0, 0, 0)).setUTCDate(1)).setUTCMonth(currentMonth + i)
      ).toISOString();

      listMonths.push(month);
    }

    let usersOfMonth = [];

    for (let i = 0; i < listMonths.length - 1; i++) {
      const usersCount = await UserModel.countDocuments({
        $and: [{ createdAt: { $gte: listMonths[i] } }, { createdAt: { $lte: listMonths[i + 1] } }],
      }).lean();

      usersOfMonth.push(usersCount);
    }

    listMonths.pop();
    listMonths = listMonths.map((month) => monthNames[new Date(month).getMonth()]);

    return {
      months: listMonths,
      data: usersOfMonth,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getUserData() {
  try {
    const users = await UserModel.aggregate([
      {
        $project: {
          email: 1,
          fullName: 1,
          city: 1,
          from: 1,
          postCount: 1,
          likeCount: 1,
          followers: { $size: "$followers" },
          followings: { $size: "$followings" },
        },
      },
    ]);

    return users;
  } catch (error) {
    return error;
  }
}

async function getReportData() {
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

  return {
    reports: reports,
    reportDataChart: [totalReports, deletedReports, refusedReports],
  };
}

export const sendMail = async (req, res) => {
  try {
    const { emails, subject, content } = req.body;

    emails.forEach((email) => {
      MailService.sendMail(req.userId, email, subject, content);
    });

    return res.status(200).json({ isSuccess: true });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
