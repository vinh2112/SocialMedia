import { UserModel } from "../models/user.model.js";

async function updateCountOfUser(userId, incPost, incLike) {
  try {
    await UserModel.findByIdAndUpdate(userId, { $inc: { postCount: incPost, likeCount: incLike } });
  } catch (error) {
    return error;
  }
}

const UserService = {
  updateCountOfUser,
};

export default UserService;
