import { INIT_STATE } from "constant";
import {
  getType,
  showBoxComment,
  fetchComments,
  createComment,
  createReply,
  deleteReply,
} from "redux/actions";
import { deleteComment } from "redux/actions/comments";

export default function commentReducers(state = INIT_STATE.comments, action) {
  switch (action.type) {
    case getType(showBoxComment.showBoxCommentRequest):
      return {
        ...state,
      };
    case getType(showBoxComment.showBoxCommentSuccess):
      return {
        ...state,
        commentId: action.payload,
      };
    case getType(fetchComments.fetchCommentsSuccess):
      return {
        ...state,
        data: [
          ...new Map(
            [...action.payload, ...state.data].map((item) => [item["_id"], item])
          ).values(),
        ],
      };
    case getType(createComment.createCommentRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(createComment.createCommentSuccess):
      return {
        ...state,
        isLoading: false,
        data: [action.payload, ...state.data],
      };
    case getType(deleteComment.deleteCommentSuccess):
      return {
        ...state,
        data: state.data.filter((comment) => comment._id !== action.payload._id),
      };
    case getType(deleteComment.deleteCommentFailure):
      return {
        ...state,
      };
    case getType(createReply.createReplyRequest):
      return {
        ...state,
      };
    case getType(createReply.createReplySuccess):
      return {
        ...state,
        data: state.data.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
      };
    case getType(deleteReply.deleteReplySuccess):
      return {
        ...state,
        data: state.data.map((comment) =>
          comment._id === action.payload._id ? action.payload : comment
        ),
      };
    default:
      return {
        ...state,
      };
  }
}
