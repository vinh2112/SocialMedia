import { CommentModel } from "../models/CommentModel.js";
import { PaymentModel } from "../models/PaymentModel.js";
import { PostModel } from "../models/PostModel.js";
import { ReportModel } from "../models/ReportModel.js";
import { UserModel } from "../models/UserModel.js";
import PostService from "../services/PostService.js";
import UserService from "../services/UserService.js";
import KeywordService from "../services/KeywordService.js";
import { watermarkImage, deleteImageCloudinary } from "../utils/cloudinary.js";

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

export const getPosts = async (req, res) => {
  try {
    const fields = req.query.fields || "";
    const limit = req.query.limit || 20;
    const page = req.query.page || 1;

    let filter = {};

    const { results } = await PostService.getAllPosts(fields, limit, page, filter, "createdAt", -1);

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getPost = async (req, res) => {
  try {
    let filter = {};
    filter["_id"] = req.params.postId;

    const { results } = await PostService.getAllPosts("", 1, 1, filter, "createdAt", -1);

    if (!results.length) return res.status(400).json({ msg: "Post not found" });

    handleUpdateScoreByAction(results[0].category, req.socket.remoteAddress, "view", 1);

    return res.status(200).json(results[0]);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getProfilePost = async (req, res) => {
  try {
    const { page, limit } = req.query;

    let filter = {};
    filter["userId"] = req.params.userId;

    const { results } = await PostService.getAllPosts("", limit, page, filter, "createdAt", -1);

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

export const getPostsTimeline = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId }).lean();

    let posts = [];
    let friendsId = user.followings.map((following) => following.toString());
    friendsId.sort(() => Math.random() - 0.5);

    // return res.json(friendsId);

    const friendPosts = await PostModel.find({ userId: { $in: friendsId } })
      .populate(POPULATE_OPTS)
      .sort("-createdAt")
      .limit(10)
      .select("-image.url -image.public_id")
      .lean();

    const friendPostsId = friendPosts.map((post) => post._id);
    // return res.json(friendPostsId);

    const newPosts = await PostModel.find({ _id: { $nin: friendPostsId } })
      .limit(5)
      .populate(POPULATE_OPTS)
      .sort("-createdAt")
      .select("-image.url -image.public_id")
      .lean();

    posts = newPosts.concat(...friendPosts);

    return res.json(
      posts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getTopLikedPosts = async (req, res) => {
  try {
    const posts = await PostModel.aggregate([
      {
        $project: {
          title: 1,
          userId: 1,
          desc: 1,
          category: 1,
          "image.watermark": 1,
          likes: 1,
          isPaymentRequired: 1,
          price: 1,
          commentCount: 1,
          createdAt: 1,
          length: { $size: "$likes" },
        },
      },
      { $sort: { length: -1 } },
      { $limit: 8 },
    ]);

    await PostModel.populate(posts, POPULATE_OPTS);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const searchPosts = async (req, res) => {
  try {
    const { query, page } = req.query;

    const posts = await PostModel.find({
      $or: [{ category: { $regex: query, $options: "i" } }, { desc: { $regex: query, $options: "i" } }],
    })
      .populate(POPULATE_OPTS)
      .skip((page - 1) * 20)
      .limit(20)
      .sort("-createdAt")
      .select("-image.url -image.public_id")
      .lean();

    if (query && posts.length) {
      handleUpdateScoreByAction([query], req.socket.remoteAddress, "search", 1);
    }

    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const getRelativePosts = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post) {
      let listRelativePosts = [];
      for await (const category of post.category) {
        const relativePosts = await PostModel.find({
          category: category,
          _id: { $nin: [post._id, ...listRelativePosts.map((post) => post._id)] },
        })
          .populate(POPULATE_OPTS)
          .sort("-createdAt")
          .select("-image.url -image.public_id")
          .lean();
        listRelativePosts.push(...relativePosts);
        if (listRelativePosts.length > 10) break;
      }

      return res.status(200).json(listRelativePosts.slice(0, 10));
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

    await PostModel.populate(newPost, POPULATE_OPTS);

    UserService.updateCountOfUser(req.userId, 1, 0);

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
        .populate(POPULATE_OPTS)
        .exec();

      UserService.updateCountOfUser(newPost.userId, 0, 1);
      handleUpdateScoreByAction(newPost.category, req.socket.remoteAddress, "react", 1);

      return res.status(200).json(newPost);
    } else {
      const newPost = await PostModel.findOneAndUpdate(
        { _id: post._id },
        {
          $pull: { likes: req.userId },
        },
        { new: true }
      )
        .populate(POPULATE_OPTS)
        .exec();
      UserService.updateCountOfUser(newPost.userId, 0, -1);
      handleUpdateScoreByAction(newPost.category, req.socket.remoteAddress, "react", -1);

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
      ).populate(POPULATE_OPTS);

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
    const public_id = post.image.public_id;
    if (post.userId.toString() === req.userId) {
      await post.deleteOne().then(() => {
        deleteImageCloudinary(public_id);
        ReportModel.deleteMany({ reportedPostId: req.params.postId });
        CommentModel.deleteMany({ postId: req.params.postId });

        UserService.updateCountOfUser(req.userId, -1, -post.likes.length);

        return res.status(200).json({ msg: "Delete Post Successfully." });
      });
    } else {
      return res.status(403).json({ msg: "You can delete only your post." });
    }
    return res.status(500).json({ msg: "Delete Failed" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

// export const watermarkPost = async (req, res) => {
//   try {
//     const posts = await PostModel.find({ "image.watermark": { $exists: false } }).limit(50);

//     const watermarks = await Promise.all(
//       posts.reduce((acc, post) => {
//         const result = new Promise(async (resolve, reject) => {
//           await watermarkImage(post.image.url).then(async (url) => {
//             await PostModel.findByIdAndUpdate(post._id, {
//               "image.watermark": url,
//             });

//             resolve(url);
//           });
//         });
//         return [...acc, result];
//       }, [])
//     );

//     return res.json(watermarks);
//   } catch (error) {
//     return res.status(500).json({ msg: error.message });
//   }
// };

export const downloadPhotoPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await PostModel.findById(postId);

    if (post.userId.toString() === req.userId) {
      handleUpdateScoreByAction(post.category, req.socket.remoteAddress, "download", 1);

      return res.status(200).json(post.image);
    }

    if (post.isPaymentRequired) {
      const payment = await PaymentModel.findOne({ postId, userId: req.userId });

      if (payment) {
        handleUpdateScoreByAction(post.category, req.socket.remoteAddress, "download", 1);

        return res.status(200).json(post.image);
      }

      return res.status(400).json({ msg: "Please pay for this photo" });
    } else {
      handleUpdateScoreByAction(post.category, req.socket.remoteAddress, "download", 1);

      return res.status(200).json(post.image);
    }
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

async function handleUpdateScoreByAction(categories, ipAddress, behaviorType, scoreInc = 1) {
  let tempCateLength = categories.length;

  for await (const category of categories) {
    await KeywordService.updateScoreOfKeyword(
      category,
      ipAddress,
      behaviorType,
      scoreInc,
      tempCateLength-- / categories.length
    );
  }
}
