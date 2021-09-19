import { PostModel } from "../models/PostModel.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .populate({
        path: "userId",
        select: "name email avatar",
      })
      .populate({
        path: "likes",
        select: "name email avatar",
      });

    res.json({ total: posts.length, posts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPost = async (req, res) => {
  const post = await PostModel.findById(req.params.postId)
    .populate({
      path: "userId",
      select: "name email avatar",
    })
    .populate({
      path: "likes",
      select: "name email avatar",
    });

  if (!post) return res.status(400).json({ msg: "Post not found" });

  res.status(200).json(post);
};

export const getProfilePost = async (req, res) => {
  const posts = await PostModel.find({ userId: req.params.userId })
    .populate({
      path: "userId",
      select: "name email avatar",
    })
    .populate({
      path: "likes",
      select: "name email avatar",
    });

  res.status(200).json({
    total: posts.length,
    posts,
  });
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

export const reactPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);
    if (!post) return res.status(400).json({ msg: "Post does not exist." });

    if (!post.likes.includes(req.userId)) {
      await post.updateOne({ $push: { likes: req.userId } });
      res.status(200).json({ msg: "The post has been liked" });
    } else {
      await post.updateOne({ $pull: { likes: req.userId } });
      res.status(200).json({ msg: "The post has been disliked" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (post.userId.toString() === req.userId) {
      const { desc, isPaymentRequired } = req.body;

      await post.updateOne({ desc, isPaymentRequired });
      res.status(200).json({ msg: "Update Post Successfully." });
    } else {
      res.status(400).json({ msg: "This is not your post." });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    if (post.userId.toString() === req.userId) {
      await post.deleteOne();
      res.status(200).json({ msg: "Delete Post Successfully." });
    } else {
      res.status(403).json({ msg: "You can delete only your post." });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
