import { INIT_STATE } from "constant";
import { getType, toast } from "redux/actions";

export default function toastReducers(state = INIT_STATE.toast, action) {
  switch (action.type) {
    case getType(toast.showToast):
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
