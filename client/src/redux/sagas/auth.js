import { call, put, take } from "redux-saga/effects";
import * as api from "api";
import * as actions from "redux/actions";
import { socket } from "context/socketContext";

export function* loginSaga(payload) {
  try {
    const res = yield call(api.AuthAPI.login, payload);
    if (res.status === 200) {
      const user = yield call(api.AuthAPI.getUserInfo);
      socket?.emit("newUser", {
        userId: user.data._id,
      });

      // socket?.emit("sendOnlineUsers");
      yield put(actions.login.loginSuccess(user.data));
    } else {
      yield put(actions.login.loginFailure(res.data.msg));
    }
  } catch (err) {
    console.log(err);
  }
}

export function* logoutSaga() {
  try {
    yield call(api.AuthAPI.logout);
    localStorage.removeItem("access_token");
    socket?.emit("logoutUser");
    // socket?.emit("sendOnlineUsers");
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
      socket?.emit("newUser", {
        userId: res.data._id,
      });
      // socket?.emit("sendOnlineUsers");
      yield put(actions.login.loginSuccess(res.data));
    }
  } catch (error) {
    localStorage.removeItem("access_token");
  }
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem("access_token"));
    if (!isLoggedIn) {
      const action = yield take(actions.login.loginRequest);
      yield call(loginSaga, action.payload);
    } else {
      yield take(actions.logout.logoutRequest);
      yield call(logoutSaga);
    }
  }
}
