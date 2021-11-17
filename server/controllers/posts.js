import { PostModel } from "../models/PostModel.js";
import { UserModel } from "../models/UserModel.js";

export const getPosts = async(req, res) => {
    try {
        const { page } = req.query;
        const posts = await PostModel.find()
            .populate({
                path: "userId",
                select: "name email avatar",
            })
            .populate({
                path: "likes",
                select: "name email avatar",
            })
            .sort("-createdAt")
            .skip((page - 1) * 5)
            .limit(5);

        res.json(posts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const getPost = async(req, res) => {
    const post = await PostModel.findById(req.params.postId)
        .populate({
            path: "userId",
            select: "name email avatar",
        })
        .populate({
            path: "likes",
            select: "name email avatar",
        })
        .sort("-createdAt");

    if (!post) return res.status(400).json({ msg: "Post not found" });

    res.status(200).json(post);
};

export const getProfilePost = async(req, res) => {
    const user = await UserModel.findOne({ _id: req.params.userId })
        .select("-password")
        .populate({
            path: "followers",
            select: "name email avatar",
        })
        .populate({
            path: "followings",
            select: "name email avatar",
        });

    if (!user) return res.status(500).json({ msg: "Not found" });

    const posts = await PostModel.find({ userId: req.params.userId })
        .populate({
            path: "userId",
            select: "name email avatar",
        })
        .populate({
            path: "likes",
            select: "name email avatar",
        })
        .sort("-createdAt");

    res.status(200).json({ user, posts });
};

export const getPostsTimeline = async(req, res) => {
    try {
        const user = await UserModel.findOne({ _id: req.userId });

        let posts = [];
        user.followings.forEach(async(following, index) => {
            const userPosts = await PostModel.find({ userId: following.toString() })
                .limit(3)
                .populate({
                    path: "userId",
                    select: "name email avatar",
                })
                .populate({
                    path: "likes",
                    select: "name email avatar",
                })
                .sort("-createdAt");
            posts = [...posts, ...userPosts];

            if (index === user.followings.length - 1) {
                const newPosts = await PostModel.find({})
                    .limit(5)
                    .populate({
                        path: "userId",
                        select: "name email avatar",
                    })
                    .populate({
                        path: "likes",
                        select: "name email avatar",
                    })
                    .sort("-createdAt");
                posts = [...posts, ...newPosts];
                return res.json(
                    posts.sort((a, b) => {
                        return b.createdAt - a.createdAt;
                    })
                );
            }
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const searchPosts = async(req, res) => {
    try {
        const { query, page } = req.query;
        const posts = await PostModel.find({
                $or: [
                    { category: { $regex: query, $options: "i" } },
                    { desc: { $regex: query, $options: "i" } },
                ],
            })
            .limit(20)
            .populate({
                path: "userId",
                select: "name email avatar",
            })
            .populate({
                path: "likes",
                select: "name email avatar",
            })
            .sort("-createdAt")
            .skip((page - 1) * 20);
        res.json(posts);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const createPost = async(req, res) => {
    try {
        const { desc, category, image, isPaymentRequired, price } = req.body;

        if (!image) {
            return res.status(400).json({ msg: "Post must have image." });
        }
        const newPost = new PostModel({
            userId: req.userId,
            desc,
            category,
            image,
            isPaymentRequired,
            price
        });
        await newPost.save();

        await PostModel.populate(newPost, {
            path: "userId",
            select: "name email avatar",
        });

        res.status(200).json(newPost);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const reactPost = async(req, res) => {
    try {
        const { postId } = req.params;

        const post = await PostModel.findById(postId);
        if (!post) return res.status(400).json({ msg: "Post does not exist." });

        if (!post.likes.includes(req.userId)) {
            const newPost = await PostModel.findOneAndUpdate({ _id: post._id }, {
                    $push: { likes: req.userId },
                }, { new: true })
                .populate({
                    path: "userId",
                    select: "name email avatar",
                })
                .populate({
                    path: "likes",
                    select: "name email avatar",
                })
                .exec();

            return res.status(200).json(newPost);
        } else {
            const newPost = await PostModel.findOneAndUpdate({ _id: post._id }, {
                    $pull: { likes: req.userId },
                }, { new: true })
                .populate({
                    path: "userId",
                    select: "name email avatar",
                })
                .populate({
                    path: "likes",
                    select: "name email avatar",
                })
                .exec();

            return res.status(200).json(newPost);
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const updatePost = async(req, res) => {
    try {
        const post = await PostModel.findById(req.params.postId);

        if (post.userId.toString() === req.userId) {
            const { desc, isPaymentRequired } = req.body;

            await post.updateOne({ desc, isPaymentRequired });
            res.status(200).json(post);
        } else {
            res.status(400).json({ msg: "This is not your post." });
        }
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const deletePost = async(req, res) => {
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