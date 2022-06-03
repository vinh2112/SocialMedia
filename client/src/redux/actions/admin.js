import { createActions } from "redux-actions";

export const fetchDataAdmin = createActions({
  fetchDataAdminRequest: undefined,
  fetchDataAdminSuccess: (payload) => payload,
  fetchDataAdminFailure: (err) => err,
});

export const handleReportAdmin = createActions({
  handleReportAdminRequest: (payload) => payload,
  handleReportAdminSuccess: (payload) => payload,
  handleReportAdminFailure: (err) => err,
});
