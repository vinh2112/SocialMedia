import { put, call } from "redux-saga/effects";
import * as actions from "redux/actions";
import * as api from "api";
import { sendNotification } from "./notifications";

export function* showBoxComment(action) {
  yield put(actions.showBoxComment.showBoxCommentSuccess(action.payload));
}

export function* createComment(action) {
  try {
    const res = yield call(api.CommentAPI.createComment, action.payload);
    // yield put(actions.createComment.createCommentSuccess(res.data));

    yield call(sendNotification, {
      receiverId: action.payload.receiverId,
      type: 1,
      targetId: res.data.userId._id,
    });
  } catch (error) {
    return error.response;
  }
}

export function* createReply(action) {
  try {
    const res = yield call(api.CommentAPI.createReplyComment, action.payload);
    yield put(actions.createReply.createReplySuccess(res.data));
  } catch (error) {
    return error;
  }
}
