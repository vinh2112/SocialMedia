import { takeLatest, fork } from "redux-saga/effects";
import {
  fetchPostsSaga,
  fetchProfilePostsSaga,
  createPostSaga,
  reactPost,
  interactUser,
} from "./posts";
import { watchUser } from "./auth";
import * as actions from "../actions";
import { createComment, createReply, showBoxComment } from "./comments";

function* mySaga() {
  yield fork(watchUser);
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(
    actions.getProfilePosts.getProfilePostsRequest,
    fetchProfilePostsSaga
  );
  yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(actions.reactPost.reactPostRequest, reactPost);
  yield takeLatest(actions.interactUser.interactUserRequest, interactUser);
  yield takeLatest(
    actions.showBoxComment.showBoxCommentRequest,
    showBoxComment
  );
  yield takeLatest(actions.createComment.createCommentRequest, createComment);
  yield takeLatest(actions.createReply.createReplyRequest, createReply);
}

export default mySaga;
