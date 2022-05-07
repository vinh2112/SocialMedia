import { INIT_STATE } from "constant";
import { fetchNotifications, getType } from "redux/actions";

export default function notificationReducers(state = INIT_STATE.notifications, action) {
  switch (action.type) {
    case getType(fetchNotifications.fetchNotificationsSuccess):
      return {
        ...state,
        data: [...action.payload],
      };
    default:
      return {
        ...state,
      };
  }
}
