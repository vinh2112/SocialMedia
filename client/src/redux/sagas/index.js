import { takeLatest, takeEvery, fork } from "redux-saga/effects";
import {
  fetchPostsSaga,
  fetchProfilePostsSaga,
  createPostSaga,
  reactPost,
  interactUser,
  fetchPostsLoadMore,
  searchPosts,
  fetchTopLikedPosts,
  deletePost,
} from "./posts";
import { watchUser } from "./auth";
import * as actions from "../actions";
import { createComment, createReply, showBoxComment } from "./comments";
import { fetchDataAdmin, handleReportAdmin } from "./admin";

function* mySaga() {
  yield fork(watchUser);
  // Post section
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeEvery(actions.getPostsLoadMore.getPostsLoadMoreRequest, fetchPostsLoadMore);
  yield takeEvery(actions.getProfilePosts.getProfilePostsRequest, fetchProfilePostsSaga);
  yield takeLatest(actions.getTopLikedPosts.getTopLikedPostsRequest, fetchTopLikedPosts);
  yield takeLatest(actions.searchPosts.searchPostsRequest, searchPosts);
  yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(actions.reactPost.reactPostRequest, reactPost);
  yield takeLatest(actions.deletePost.deletePostRequest, deletePost);
  // End post section

  // User Section
  yield takeLatest(actions.interactUser.interactUserRequest, interactUser);
  // End User section

  // Comment section
  yield takeLatest(actions.showBoxComment.showBoxCommentRequest, showBoxComment);
  yield takeLatest(actions.createComment.createCommentRequest, createComment);
  yield takeLatest(actions.createReply.createReplyRequest, createReply);
  // End comment section

  // Admin section
  yield takeLatest(actions.fetchDataAdmin.fetchDataAdminRequest, fetchDataAdmin);
  yield takeLatest(actions.handleReportAdmin.handleReportAdminRequest, handleReportAdmin);
  // End admin section
}

export default mySaga;
