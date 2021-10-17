import { put, call } from "redux-saga/effects";
import * as actions from "redux/actions";
import * as api from "api";

export function* showBoxComment(action) {
  yield put(actions.showBoxComment.showBoxCommentSuccess(action.payload));
}

export function* createComment(action) {
  try {
    const res = yield call(api.CommentAPI.createComment, action.payload);
    yield put(actions.createComment.createCommentSuccess(res.data));
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