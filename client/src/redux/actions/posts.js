import { createAction, createActions } from "redux-actions";

export const resetPosts = createAction("RESET_POSTS");

export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (err) => err,
});

export const getPostsLoadMore = createActions({
  getPostsLoadMoreRequest: (payload) => payload,
  getPostsLoadMoreSuccess: (payload) => payload,
});

export const getProfilePosts = createActions({
  getProfilePostsRequest: (payload) => payload,
  getProfilePostsSuccess: (payload) => payload,
  getProfilePostsFailure: (err) => err,
});

export const getTopLikedPosts = createActions({
  getTopLikedPostsRequest: undefined,
  getTopLikedPostsSuccess: (payload) => payload,
});

export const searchPosts = createActions({
  searchPostsRequest: (payload) => payload,
  searchPostsSuccess: (payload) => payload,
});

export const createPost = createActions({
  createPostRequest: (payload) => payload,
  createPostSuccess: (payload) => payload,
  createPostFailure: (err) => err,
});

export const reactPost = createActions({
  reactPostRequest: (payload) => payload,
  reactPostSuccess: (payload) => payload,
  reactPostFailure: (err) => err,
});
