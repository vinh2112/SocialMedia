import { createActions } from "redux-actions";

export const showBoxComment = createActions({
  showBoxCommentRequest: (payload) => payload,
  showBoxCommentSuccess: (payload) => payload,
});

export const fetchComments = createActions({
  fetchCommentsSuccess: (payload) => payload,
});

export const createComment = createActions({
  createCommentRequest: (payload) => payload,
  createCommentSuccess: (payload) => payload,
  createCommentFailure: (err) => err,
});

export const deleteComment = createActions({
  deleteCommentSuccess: (payload) => payload,
  deleteCommentFailure: (err) => err,
});

export const createReply = createActions({
  createReplyRequest: (payload) => payload,
  createReplySuccess: (payload) => payload,
  createReplyFailure: (err) => err,
});

export const deleteReply = createActions({
  deleteReplySuccess: (payload) => payload,
  deleteReplyFailure: (err) => err,
});
