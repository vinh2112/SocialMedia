import { PaymentModel } from "../models/PaymentModel.js";
import { PostModel } from "../models/PostModel.js";
import { ReportModel } from "../models/ReportModel.js";
import { UserModel } from "../models/UserModel.js";
import { watermarkImage } from "../utils/watermark.js";

export const getPosts = async (req, res) => {
  try {
    const { page } = req.query;
    const posts = await PostModel.find()
      .populate({
        path: "userId",
        select: "fullName name email avatar",
      })
      .populate({
        path: "likes",
        select: "fullName name email avatar",
      })
      .sort("-createdAt")
      .skip((page - 1) * 5)
      .limit(5)
      .select("-image.url -image.public_id");

    res.json(posts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getPost = async (req, res) => {
  const post = await PostModel.findById(req.params.postId)
    .populate({
      path: "userId",
      select: "fullName name email avatar",
    })
    .populate({
      path: "likes",
      select: "fullName name email avatar",
    })
    .sort("-createdAt")
    .select("-image.url -image.public_id");

  if (!post) return res.status(400).json({ msg: "Post not found" });

  res.status(200).json(post);
};

export const getProfilePost = async (req, res) => {
  const { page } = req.query;

  const posts = await PostModel.find({ userId: req.params.userId })
    .populate({
      path: "userId",
      select: "fullName name email avatar",
    })
    .populate({
      path: "likes",
      select: "fullName name email avatar",
    })
    .sort("-createdAt")
    .skip((page - 1) * 5)
    .limit(5)
    .select("-image.url -image.public_id");

  res.status(200).json(posts);
};

export const getPostsTimeline = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId });

    let posts = [];
    const friendPosts = await Promise.all(
      user.followings.map((following) => {
        return PostModel.find({ userId: following.toString() })
          .populate({
            path: "userId",
            select: "fullName name email avatar",
          })
          .populate({
            path: "likes",
            select: "fullName name email avatar",
          })
          .sort("-createdAt")
          .limit(3)
          .select("-image.url -image.public_id");
      })
    );
    const newPosts = await PostModel.find({})
      .limit(5)
      .populate({
        path: "userId",
        select: "fullName name email avatar",
      })
      .populate({
        path: "likes",
        select: "fullName name email avatar",
      })
      .sort("-createdAt")
      .select("-image.url -image.public_id");

    posts = newPosts.concat(...friendPosts);

    return res.json(
      posts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getTopLikedPosts = async (req, res) => {
  try {
    const posts = await PostModel.find()
      .sort("-likes")
      .limit(6)
      .populate({
        path: "userId",
        select: "fullName name email avatar",
      })
      .populate({
        path: "likes",
        select: "fullName name email avatar",
      })
      .select("-image.url -image.public_id");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const { query } = req.query;
    const posts = await PostModel.find({
      $or: [
        { category: { $regex: query, $options: "i" } },
        { desc: { $regex: query, $options: "i" } },
      ],
    })
      .populate({
        path: "userId",
        select: "fullName name email avatar",
      })
      .populate({
        path: "likes",
        select: "fullName name email avatar",
      })
      .sort("-createdAt")
      .select("-image.url -image.public_id");
    res.json(posts);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getRelativePosts = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post) {
      const data = await PostModel.find({
        category: { $in: post.category },
        _id: { $nin: post._id },
      })
        .populate({
          path: "userId",
          select: "fullName name email avatar",
        })
        .populate({
          path: "likes",
          select: "fullName name email avatar",
        })
        .sort("-createdAt")
        .select("-image.url -image.public_id")
        .limit(10);

      return res.status(200).json(data);
    } else {
      return res.status(403).json({ msg: "Post does not exist." });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const createPost = async (req, res) => {
  try {
    const { desc, category, image, isPaymentRequired, price } = req.body;

    if (!image) {
      return res.status(400).json({ msg: "Post must have image." });
    }
    image.watermark = await watermarkImage(image.url);
    const newPost = new PostModel({
      userId: req.userId,
      desc,
      category,
      image,
      isPaymentRequired,
      price,
    });
    await newPost.save();

    await PostModel.populate(newPost, {
      path: "userId",
      select: "fullName name email avatar",
    });

    res.status(200).json(newPost);
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
      const newPost = await PostModel.findOneAndUpdate(
        { _id: post._id },
        {
          $push: { likes: req.userId },
        },
        { new: true }
      )
        .populate({
          path: "userId",
          select: "fullName name email avatar",
        })
        .populate({
          path: "likes",
          select: "fullName name email avatar",
        })
        .exec();

      return res.status(200).json(newPost);
    } else {
      const newPost = await PostModel.findOneAndUpdate(
        { _id: post._id },
        {
          $pull: { likes: req.userId },
        },
        { new: true }
      )
        .populate({
          path: "userId",
          select: "fullName name email avatar",
        })
        .populate({
          path: "likes",
          select: "fullName name email avatar",
        })
        .exec();

      return res.status(200).json(newPost);
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (post.userId.toString() === req.userId) {
      const { desc, isPaymentRequired, price } = req.body;

      const newPost = await PostModel.findByIdAndUpdate(
        post._id,
        {
          desc: desc,
          isPaymentRequired: isPaymentRequired,
          price: price || 0,
        },
        { new: true }
      )
        .populate({
          path: "userId",
          select: "fullName name email avatar",
        })
        .populate({
          path: "likes",
          select: "fullName name email avatar",
        });

      return res.status(200).json(newPost);
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
      await post.deleteOne().then(async () => {
        await ReportModel.findOneAndDelete({ postId: req.params.postId });
        res.status(200).json({ msg: "Delete Post Successfully." });
      });
    } else {
      res.status(403).json({ msg: "You can delete only your post." });
    }
    res.status(500).json({ msg: "Delete Failed" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const watermarkPost = async (req, res) => {
  try {
    const posts = await PostModel.find({ "image.watermark": { $exists: false } }).limit(50);

    const watermarks = await Promise.all(
      posts.reduce((acc, post) => {
        const result = new Promise(async (resolve, reject) => {
          await watermarkImage(post.image.url).then(async (url) => {
            await PostModel.findByIdAndUpdate(post._id, {
              "image.watermark": url,
            });

            resolve(url);
          });
        });
        return [...acc, result];
      }, [])
    );

    return res.json(watermarks);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const downloadPhotoPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);

    if (post.isPaymentRequired) {
      const payment = await PaymentModel.findOne({ postId, userId: req.userId });

      if (payment) {
        return res.status(200).json(post.image);
      }

      return res.status(200).json({ msg: "Please pay for this photo" });
    } else {
      return res.status(200).json(post.image);
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
