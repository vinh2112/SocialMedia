import { call, put } from "redux-saga/effects";
import * as actions from "redux/actions";
import * as api from "api";
import { socket } from "context/socketContext";

export function* sendNotification(payload) {
  try {
    console.log(payload);
    const res = yield call(api.NotificationAPI.createNotification, payload.payload || payload);

    if (res && res.data.isSuccess) {
      socket?.emit("sendNotification", {
        userId: payload.receivers[0],
      });
    }
  } catch (error) {
    return error.response;
  }
}

export function* fetchNotifications() {
  try {
    const res = yield call(api.NotificationAPI.fetchNotifications);

    if (res.status === 200) {
      yield put(actions.fetchNotifications.fetchNotificationsSuccess(res.data));
    }
  } catch (error) {
    return error.response;
  }
}
