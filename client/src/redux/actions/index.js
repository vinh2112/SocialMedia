import { createAction } from "redux-actions";
import { login, logout } from "./auth";
import { interactUser, getProfileUser, getCurrentUser } from "./users";
import { fetchDataAdmin, handleReportAdmin } from "./admin";
import {
  getPosts,
  getPostsLoadMore,
  getProfilePosts,
  getTopLikedPosts,
  searchPosts,
  createPost,
  updatePost,
  reactPost,
  resetPosts,
  deletePost,
} from "./posts";
import { showBoxComment, fetchComments, createComment, deleteComment, createReply, deleteReply } from "./comments";
import { fetchNotifications, createNotification } from "./notifications";
import { toast } from "./toast";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const showModal = createAction("SHOW_MODAL");

export const hideModal = createAction("HIDE_MODAL");

export const resetNoti = createAction("RESET_NOTI");

export {
  toast,
  login,
  logout,
  resetPosts,
  getProfileUser,
  getCurrentUser,
  interactUser,
  getPosts,
  getPostsLoadMore,
  getProfilePosts,
  getTopLikedPosts,
  searchPosts,
  createPost,
  updatePost,
  reactPost,
  deletePost,
  showBoxComment,
  fetchComments,
  createComment,
  deleteComment,
  createReply,
  deleteReply,
  fetchNotifications,
  createNotification,
  fetchDataAdmin,
  handleReportAdmin,
};
