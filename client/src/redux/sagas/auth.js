import { call, put, take, fork } from "redux-saga/effects";
import * as api from "api";
import * as actions from "redux/actions";

export function* loginSaga(payload) {
  try {
    yield call(api.AuthAPI.login, payload);
    const res = yield call(api.AuthAPI.getUserInfo);
    yield put(actions.login.loginSuccess(res.data));
  } catch (err) {
    yield put(actions.login.loginFailure(err.response.data.msg));
  }
}

export function* logoutSaga() {
  try {
    yield call(api.AuthAPI.logout);
    localStorage.removeItem("access_token");
    yield put(actions.logout.logoutSuccess());
  } catch (err) {
    console.log(err);
  }
}

export function* watchUser() {
  try {
    const access_token = localStorage.getItem("access_token");
    if (access_token) {
      const res = yield call(api.AuthAPI.getUserInfo);
      yield put(actions.login.loginSuccess(res.data));
    }
  } catch (error) {
    localStorage.removeItem("access_token");
  }
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action = yield take(actions.login.loginRequest);
      yield fork(loginSaga, action.payload);
    }
    yield take(actions.logout.logoutRequest);
    yield call(logoutSaga);
  }
}
