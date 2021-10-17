import { createActions } from "redux-actions";

export const toast = createActions({
  showToast: (payload) => payload,
});
