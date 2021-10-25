import { createAction } from "redux-actions";
import { login, logout } from "./auth";
import { interactUser } from "./users";
import {
  getPosts,
  getPostsLoadMore,
  getProfilePosts,
  searchPosts,
  createPost,
  reactPost,
} from "./posts";
import {
  showBoxComment,
  fetchComments,
  createComment,
  deleteComment,
  createReply,
  deleteReply,
} from "./comments";
import { toast } from "./toast";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const showModal = createAction("SHOW_CREATE_POST_MODAL");

export const hideModal = createAction("HIDE_CREATE_POST_MODAL");

export {
  toast,
  login,
  logout,
  interactUser,
  getPosts,
  getPostsLoadMore,
  getProfilePosts,
  searchPosts,
  createPost,
  reactPost,
  showBoxComment,
  fetchComments,
  createComment,
  deleteComment,
  createReply,
  deleteReply,
};
