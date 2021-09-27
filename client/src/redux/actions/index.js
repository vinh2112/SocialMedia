import { createAction, createActions } from "redux-actions";

export const getType = (reduxAction) => {
  return reduxAction().type;
};

export const login = createActions({
  loginRequest: (payload) => payload,
  loginSuccess: (payload) => payload,
  loginFailure: (err) => err,
});

export const logout = createActions({
  logoutRequest: undefined,
  logoutSuccess: undefined,
});

export const getPosts = createActions({
  getPostsRequest: undefined,
  getPostsSuccess: (payload) => payload,
  getPostsFailure: (err) => err,
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

export const showModal = createAction("SHOW_CREATE_POST_MODAL");
export const hideModal = createAction("HIDE_CREATE_POST_MODAL");
