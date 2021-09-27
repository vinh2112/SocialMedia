import { takeLatest, fork } from "redux-saga/effects";
import { fetchPostsSaga, createPostSaga, reactPost } from "./posts";
import { watchUser } from "./auth";
import * as actions from "../actions";

function* mySaga() {
  yield fork(watchUser);
  yield takeLatest(actions.getPosts.getPostsRequest, fetchPostsSaga);
  yield takeLatest(actions.createPost.createPostRequest, createPostSaga);
  yield takeLatest(actions.reactPost.reactPostRequest, reactPost);
}

export default mySaga;
