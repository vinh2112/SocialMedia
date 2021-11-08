import { call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";

function* fetchPosts() {
  const posts = yield call(api.PostAPI.fetchPosts);
  yield put(actions.getPosts.getPostsSuccess(posts.data));
}

function* fetchPostsTimeline() {
  const posts = yield call(api.PostAPI.fetchPostsTimeline);
  yield put(actions.getPosts.getPostsSuccess(posts.data));
}

function* fetchProfilePosts(userId) {
  const posts = yield call(api.PostAPI.fetchProfilePosts, userId);
  yield put(actions.getProfilePosts.getProfilePostsSuccess(posts.data));
}

export function* fetchPostsSaga() {
  try {
    const TOKEN = localStorage.getItem("access_token");
    if (TOKEN) {
      yield fetchPostsTimeline();
    } else {
      yield fetchPosts();
    }
  } catch (error) {
    console.log(error);
    yield put(actions.getPosts.getPostsFailure(error.response.data.msg));
  }
}

export function* fetchPostsLoadMore(action) {
  try {
    const res = yield call(api.PostAPI.fetchPosts, action.payload);
    // console.log(res.data);
    yield put(actions.getPostsLoadMore.getPostsLoadMoreSuccess(res.data));
  } catch (error) {
    return error;
  }
}

export function* fetchProfilePostsSaga(action) {
  try {
    yield fetchProfilePosts(action.payload);
  } catch (error) {
    console.log(error);
    yield put(actions.getProfilePosts.getPostsFailure());
  }
}

export function* fetchTopLikedPosts() {
  try {
    const posts = yield call(api.PostAPI.fetchTopLikedPosts);
    yield put(actions.getTopLikedPosts.getTopLikedPostsSuccess(posts.data));
  } catch (error) {
    return error;
  }
}

export function* createPostSaga(action) {
  try {
    const { categories, image } = yield call(api.UPLOAD.uploadImage, action.payload.image);

    const res = yield call(api.PostAPI.createPost, {
      ...action.payload,
      category: categories,
      image,
    });
    yield put(actions.createPost.createPostSuccess(res.data));
    yield put(actions.hideModal());
  } catch (error) {
    console.log(error);
    yield put(actions.createPost.createPostFailure(error.response.data.msg));
  }
}

export function* reactPost(action) {
  try {
    const res = yield call(api.PostAPI.reactPost, action.payload);
    yield put(actions.reactPost.reactPostSuccess(res.data));
  } catch (error) {
    yield put(actions.reactPost.reactPostFailure);
  }
}

export function* interactUser(action) {
  try {
    const res = yield call(api.UserAPI.interact, action.payload);
    yield put(actions.interactUser.interactUserSuccess(res.data));
  } catch (error) {
    yield put(actions.interactUser.interactUserFailure);
  }
}

export function* searchPosts(action) {
  try {
    const res = yield call(api.PostAPI.searchPosts, action.payload);
    yield put(actions.searchPosts.searchPostsSuccess(res.data));
  } catch (error) {
    console.log(error.response);
  }
}
