import { createActions } from "redux-actions";

export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (err) => err,
});

export const getProfilePosts = createActions({
  getProfilePostsRequest: (payload) => payload,
  getProfilePostsSuccess: (payload) => payload,
  getProfilePostsFailure: (err) => err,
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
