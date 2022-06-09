import { PostModel } from "../models/PostModel.js";
import { UserModel } from "../models/UserModel.js";
import { ReportModel } from "../models/ReportModel.js";
import { CommentModel } from "../models/CommentModel.js";
import { KeywordModel } from "../models/KeywordModel.js";

export const getTotal = async (req, res) => {
  try {
    const posts = await PostModel.find().lean();
    const users = await UserModel.estimatedDocumentCount().lean();
    const reports = await ReportModel.countDocuments({ isDeleted: false }).lean();

    let keywords = [];
    for await (const post of posts) {
      keywords = [...new Map([...keywords, ...post.category].map((item) => [item, item])).values()];
    }

    await KeywordModel.insertMany(
      keywords.map((keyword) => {
        return { keyword: keyword.toLowerCase() };
      })
    );

    const userChart = await getUserCountByMonth();
    const reportData = await getReportData();

    return res.status(200).json({
      totalPosts: posts.length,
      totalUsers: users,
      totalReports: reports,
      totalKeywords: keywords.length,
      userChart,
      reportData,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getDataCountOfUser = async (req, res) => {
  try {
    // let listUSer = [];
    // const users = await UserModel.find();

    // for (const user of users) {
    //   const postsOfUser = await PostModel.find({ userId: user._id });
    //   const postCount = postsOfUser.length;
    //   const likeCount = postsOfUser.reduce((count, currItem) => {
    //     return (count += currItem.likes.length);
    //   }, 0);

    //   await UserModel.findByIdAndUpdate(user._id, {
    //     $set: { postCount: postCount, likeCount: likeCount },
    //   });
    // }

    // return res.json(listUSer);

    const comments = await CommentModel.find({
      userId: "62765c98362cd4552b5b71f6",
    });

    // for (const user of users) {
    //   await PostModel.findByIdAndUpdate(post._id, { $pull: { likes: "62765c98362cd4552b5b71f6" } });
    // }

    res.json(comments);
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
