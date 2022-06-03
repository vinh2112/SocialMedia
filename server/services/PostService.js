import { PostModel } from "../models/PostModel.js";

async function updateCommentCount(postId, incValue) {
  try {
    await PostModel.findByIdAndUpdate(postId, { $inc: { commentCount: incValue } });
  } catch (error) {
    return error;
  }
}

const PostService = {
  updateCommentCount,
};

export default PostService;
