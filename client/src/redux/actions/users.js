import { createActions, createAction } from "redux-actions";

export const interactUser = createActions({
  interactUserRequest: (payload) => payload,
  interactUserSuccess: (payload) => payload,
  interactUserFailure: (err) => err,
});

export const getCurrentUser = createAction("GET_CURRENT_USER", (payload) => payload);

export const getProfileUser = createAction("GET_PROFILE_USER", (payload) => payload);
