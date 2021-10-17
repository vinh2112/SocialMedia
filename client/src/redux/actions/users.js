import { createActions } from "redux-actions";

export const interactUser = createActions({
  interactUserRequest: (payload) => payload,
  interactUserSuccess: (payload) => payload,
  interactUserFailure: (err) => err,
});
