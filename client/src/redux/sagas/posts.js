import { call, put } from "redux-saga/effects";
import * as actions from "../actions";
import * as api from "../../api";
import { sendNotification } from "./notifications";

function* fetchPosts() {
  const posts = yield call(api.PostAPI.fetchPosts);
  yield put(actions.getPosts.getPostsSuccess(posts.data));
}

function* fetchPostsTimeline() {
  const res = yield call(api.PostAPI.fetchPostsTimeline);
  if (res.status === 200) {
    yield put(actions.getPosts.getPostsSuccess(res.data));
  }
}

function* fetchProfilePosts(userId) {
  const res = yield call(api.PostAPI.fetchProfilePosts, userId);
  if (res.status === 200) {
    yield put(actions.getProfilePosts.getProfilePostsSuccess(res.data));
  }
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
    if (res.data.length !== 0) {
      yield put(actions.getPostsLoadMore.getPostsLoadMoreSuccess(res.data));
    }
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
    const { isDuplicate } = yield call(api.UPLOAD.checkDuplicateImage, action.payload.image);

    if (!isDuplicate) {
      const { categories, image } = yield call(api.UPLOAD.uploadImage, action.payload.image);

      const res = yield call(api.PostAPI.createPost, {
        ...action.payload,
        category: categories,
        image,
      });
      yield put(actions.createPost.createPostSuccess(res.data));
      yield put(actions.hideModal());
    } else {
      yield put(actions.createPost.createPostFailure());
      // yield put(actions.hideModal());

      yield put(
        actions.toast.showToast({
          message: "This photo is exist",
          type: "danger",
        })
      );
    }
  } catch (error) {
    yield put(actions.createPost.createPostFailure(error.response.data.msg));
  }
}

export function* reactPost(action) {
  try {
    const res = yield call(api.PostAPI.reactPost, action.payload);

    if (res.status === 200) {
      yield put(actions.reactPost.reactPostSuccess(res.data));

      yield call(sendNotification, {
        receiverId: res.data.userId._id,
        type: 0,
        targetId: res.data._id,
      });
    }
  } catch (error) {
    yield put(actions.reactPost.reactPostFailure());
  }
}

export function* interactUser(action) {
  try {
    const res = yield call(api.UserAPI.interact, action.payload);
    yield put(actions.interactUser.interactUserSuccess(res.data));

    yield call(sendNotification, {
      receiverId: res.data._id,
      type: 2,
      targetId: res.data._id,
    });
  } catch (error) {
    yield put(actions.interactUser.interactUserFailure());
  }
}

export function* searchPosts(action) {
  try {
    if (action.payload.isSearching) {
      yield put(actions.searchPosts.searchPostsSearching());
    }
    const res = yield call(api.PostAPI.searchPosts, action.payload);
    yield put(
      actions.searchPosts.searchPostsSuccess({
        posts: res.data,
        isSearching: action.payload.isSearching,
      })
    );
  } catch (error) {
    console.log(error.response);
  }
}

export function* deletePost(action) {
  try {
    yield call(api.PostAPI.deletePost, action.payload);
    yield put(actions.deletePost.deletePostSuccess(action.payload));
    yield put(
      actions.toast.showToast({
        message: "Deleted post",
        type: "success",
      })
    );
  } catch (error) {
    yield put(
      actions.toast.showToast({
        message: error.response.data.msg,
        type: "warning",
      })
    );
  }
}
