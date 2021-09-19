import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate({
      path: "userId",
      select: "email avatar",
    });

    res.json({ posts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createPost = async (req, res) => {
  try {
    const { desc, category, image, isPaymentRequired } = req.body;

    if (!image) {
      return res.status(400).json({ msg: "Post must have image." });
    }
    const newPost = new PostModel({
      userId: req.userId,
      desc,
      category,
      isPaymentRequired,
    });
    await newPost.save();

    res.status(200).json({ success: true, newPost });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
