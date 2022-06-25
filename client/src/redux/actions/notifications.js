import { createActions } from "redux-actions";

export const createNotification = createActions({
  createNotificationRequest: (payload) => payload,
  // fetchNotificationsSuccess: (payload) => payload,
});

export const fetchNotifications = createActions({
  fetchNotificationsRequest: () => undefined,
  fetchNotificationsSuccess: (payload) => payload,
});
