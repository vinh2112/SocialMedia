import { INIT_STATE } from "constant";
import {
  getType,
  showBoxComment,
  fetchComments,
  createComment,
  createReply,
  deleteReply,
  deleteComment,
} from "redux/actions";

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
        // data: [
        //   ...new Map(
        //     [...action.payload, ...state.data].map((item) => [item["_id"], item])
        //   ).values(),
        // ],
        data: [...action.payload].reduce((prev, curr) => {
          return prev.some(
            (item) =>
              item._id === curr._id ||
              (item._id === curr._id && item.reply.length !== curr.reply.length)
          )
            ? (prev[prev.findIndex((el) => el._id === curr._id)] = curr) && [...prev]
            : [curr, ...prev];
        }, state.data),
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
        // data: [...state.data, action.payload],
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
