import { INIT_STATE } from "constant";
import { fetchNotifications, getType, resetNoti } from "redux/actions";

export default function notificationReducers(state = INIT_STATE.notifications, action) {
  switch (action.type) {
    case getType(fetchNotifications.fetchNotificationsRequest):
      return {
        ...state,
        isLoading: true,
        data: [],
      };
    case getType(fetchNotifications.fetchNotificationsSuccess):
      return {
        ...state,
        isLoading: false,
        data: [...action.payload],
      };
    case getType(resetNoti):
      return {
        ...state,
        data: [],
      };
    default:
      return {
        ...state,
      };
  }
}
