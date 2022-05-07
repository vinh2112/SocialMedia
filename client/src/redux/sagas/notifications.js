import { call } from "redux-saga/effects";
// import * as actions from "redux/actions";
import * as api from "api";
import { socket } from "context/socketContext";

export function* sendNotification(payload) {
  try {
    const res = yield call(api.NotificationAPI.createNotification, payload);

    if (res && res.data.isSuccess) {
      socket?.emit("sendNotification", {
        userId: payload.receiverId,
      });
    }
  } catch (error) {
    return error.response;
  }
}
