import { createActions } from "redux-actions";

export const login = createActions({
  loginRequest: (payload) => payload,
  loginSuccess: (payload) => payload,
  loginFailure: (err) => err,
});

export const logout = createActions({
  logoutRequest: undefined,
  logoutSuccess: undefined,
});
