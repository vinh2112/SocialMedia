import { INIT_STATE } from "constant";
import { getType, fetchDataAdmin, handleReportAdmin } from "redux/actions";

export default function adminReducers(state = INIT_STATE.admin, action) {
  switch (action.type) {
    case getType(fetchDataAdmin.fetchDataAdminRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(fetchDataAdmin.fetchDataAdminSuccess):
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case getType(fetchDataAdmin.fetchDataAdminFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(handleReportAdmin.handleReportAdminRequest):
      return {
        ...state,
      };
    case getType(handleReportAdmin.handleReportAdminSuccess):
      return {
        ...state,
        data: action.payload.isDeleted
          ? {
              ...state.data,
              reportData: {
                ...state.data.reportData,
                reports: state.data.reportData.reports.filter(
                  (report) => report.reportedPostId._id !== action.payload.data && report
                ),
                reportDataChart: state.data.reportData.reportDataChart.map((item, index) =>
                  index === 1 ? ++item : item
                ),
              },
            }
          : {
              ...state.data,
              reportData: {
                ...state.data.reportData,
                reports: state.data.reportData.reports.filter(
                  (report) => report._id !== action.payload.data
                ),
                reportDataChart: state.data.reportData.reportDataChart.map((item, index) =>
                  index === 2 ? ++item : item
                ),
              },
            },
      };

    case getType(handleReportAdmin.handleReportAdminFailure):
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}
