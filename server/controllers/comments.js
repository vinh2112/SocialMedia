import { CommentModel } from "../models/CommentModel.js";
import { PostModel } from "../models/PostModel.js";

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
        select: "name email",
      })
      .populate({
        path: "postId",
        select: "userId",
      });

    if (!comments.length) {
      return res.status(403).json({ msg: "This post has had comment yet" });
    }

    return res.status(200).json({
      total: comments.length,
      comments,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const newComment = new CommentModel({
      comment: comment,
      userId: req.userId,
      postId: req.params.postId,
    });
    await newComment.save();

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
    if (!comment) return res.status(403).json({ msg: "Comment not found" });
    if (comment.userId.toString() === req.userId) {
      await comment.deleteOne();
      res.status(200).json({ msg: "Delete Comment Succesfully" });
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
    const comment = await CommentModel.findById(req.params.commentId);
    if (!comment) {
      res.status(403).json({ msg: "Comment not found" });
    } else {
      await comment.updateOne({
        $push: {
          reply: {
            user: req.userId,
            replyComment: reply,
          },
        },
      });
      res.status(200).json("Reply successfully");
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
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
        await comment.updateOne({
          $pull: { reply: { _id: replyId } },
        });
        res.status(200).json("The owner post has deleted this comment");
      } else {
        await comment.updateOne({
          $pull: {
            reply: { _id: replyId, user: req.userId },
          },
        });
        res.status(200).json("The comment has been deleted");
      }
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
