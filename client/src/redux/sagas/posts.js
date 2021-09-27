import { call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchPosts() {
  const posts = yield call(api.PostAPI.fetchPosts);
  yield put(actions.getPosts.getPostsSuccess(posts.data));
}

export function* fetchPostsSaga() {
  try {
    yield fetchPosts();
  } catch (error) {
    console.log(error);
    yield put(actions.getPosts.getPostsFailure(error.response.data.msg));
  }
}

export function* createPostSaga(action) {
  try {
    const { categories, url } = yield call(
      api.uploadImage,
      action.payload.image
    );
    const res = yield call(api.PostAPI.createPost, {
      ...action.payload,
      category: categories,
      image: url,
    });
    yield put(actions.hideModal());
    yield put(actions.createPost.createPostSuccess(res.data));
  } catch (error) {
    console.log(error.response);
    yield put(actions.createPost.createPostFailure(error.response.data.msg));
  }
}

export function* reactPost(action) {
  try {
    const res = yield call(api.PostAPI.reactPost, action.payload);
    console.log(res.data);
    yield put(actions.reactPost.reactPostSuccess(res.data));
  } catch (error) {
    yield put(actions.reactPost.reactPostFailure);
  }
}
