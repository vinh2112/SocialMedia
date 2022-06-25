import { PostModel } from "../models/post.model.js";

const SELECT_FIELD = "-image.url -image.public_id";

const POPULATE_OPTS = [
  {
    path: "userId",
    select: "fullName name email avatar",
  },
  {
    path: "likes",
    select: "fullName name email avatar",
  },
];

async function getAllPosts(fields, limit = 20, page = 1, filter = {}, sortBy = "createdAt", sortType = -1) {
  if (!fields) {
    fields = SELECT_FIELD;
  }

  if (fields.indexOf(",") > -1) {
    fields = fields.split(",").join(" ");
  }

  const sortOtp = {};
  sortOtp[sortBy] = sortType;

  const results = await PostModel.find(filter)
    .select(fields)
    .populate(POPULATE_OPTS)
    .skip((page - 1) * limit)
    .sort(sortOtp)
    .limit(limit)
    .lean()
    .exec();

  return { results };
}

async function updateCommentCount(postId, incValue) {
  try {
    await PostModel.findByIdAndUpdate(postId, { $inc: { commentCount: incValue } });
  } catch (error) {
    return error;
  }
}

const PostService = {
  getAllPosts,
  updateCommentCount,
};

export default PostService;
