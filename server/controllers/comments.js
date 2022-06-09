import { CommentModel } from "../models/CommentModel.js";
import { PostModel } from "../models/PostModel.js";
import PostService from "../services/PostService.js";

export const getCommentPost = async (req, res) => {
  try {
    const comments = await CommentModel.find({
      postId: req.params.postId,
    })
      .populate({
        path: "reply.user",
        select: "name email avatar",
      })
      .populate({
        path: "userId",
        select: "name email avatar",
      })
      .sort("createdAt")
      .lean();

    if (!comments.length) {
      return res.status(200).json([]);
    }

    return res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const newComment = new CommentModel({
      userId: req.userId,
      postId,
      comment,
    });
    await newComment.save();

    await CommentModel.populate(newComment, {
      path: "userId",
      select: "name email avatar",
    });

    await PostService.updateCommentCount(postId, 1);

    res.status(200).json(newComment);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (comment.userId.toString() === req.userId) {
      await comment.updateOne({ comment: req.body.comment });
      res.status(200).json("Comment updated");
    } else {
      res.status(400).json("This is not your comment");
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    const post = await PostModel.findById(comment.postId);

    if (!comment) return res.status(403).json({ msg: "Comment not found" });
    if (comment.userId.toString() === req.userId || post.userId.toString() === req.userId) {
      await comment.deleteOne();
      let commentCount = comment.reply.length + 1;
      await PostService.updateCommentCount(comment.postId, -commentCount);

      await CommentModel.populate(comment, [
        {
          path: "userId",
          select: "name email avatar",
        },
        {
          path: "reply.user",
          select: "name email avatar",
        },
      ]);

      res.status(200).json(comment);
    } else {
      res.status(400).json({ msg: "You can't delete the other's comment" });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const replyComment = async (req, res) => {
  try {
    const { reply } = req.body;
    const comment = await CommentModel.findByIdAndUpdate(
      req.params.commentId,
      {
        $push: {
          reply: {
            user: req.userId,
            replyComment: reply,
          },
        },
      },
      { new: true }
    )
      .populate({
        path: "reply.user",
        select: "name email avatar",
      })
      .populate({
        path: "userId",
        select: "name email avatar",
      });
    await PostService.updateCommentCount(comment.postId, 1);

    return res.status(200).json(comment);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteReplyComment = async (req, res) => {
  try {
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      res.status(403).json("Comment not found");
    } else {
      const { replyId } = req.body;
      const post = await PostModel.findById(comment.postId);

      if (post.userId.toString() === req.userId) {
        const newComment = await CommentModel.findByIdAndUpdate(
          req.params.commentId,
          {
            $pull: { reply: { _id: replyId } },
          },
          { new: true }
        )
          .populate({
            path: "reply.user",
            select: "name email avatar",
          })
          .populate({
            path: "userId",
            select: "name email avatar",
          });

        await PostService.updateCommentCount(comment.postId, -1);

        return res.status(200).json(newComment);
      } else {
        const newComment = await CommentModel.findByIdAndUpdate(
          req.params.commentId,
          {
            $pull: {
              reply: { _id: replyId, user: req.userId },
            },
          },
          { new: true }
        )
          .populate({
            path: "reply.user",
            select: "name email avatar",
          })
          .populate({
            path: "userId",
            select: "name email avatar",
          });

        await PostService.updateCommentCount(comment.postId, -1);

        return res.status(200).json(newComment);
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
