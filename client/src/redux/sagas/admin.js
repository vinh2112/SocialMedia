import { call, put } from "redux-saga/effects";
import * as api from "api";
import * as actions from "redux/actions";

export function* fetchDataAdmin() {
  try {
    const res = yield call(api.AdminAPI.getTotal);
    if (res.status === 200) {
      yield put(actions.fetchDataAdmin.fetchDataAdminSuccess(res.data));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* handleReportAdmin(action) {
  try {
    yield put(actions.handleReportAdmin.handleReportAdminSuccess(action.payload));
  } catch (error) {
    console.log(error);
  }
}
