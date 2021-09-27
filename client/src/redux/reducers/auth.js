import { INIT_STATE } from "constant";
import { login, getType, logout } from "redux/actions";

export default function userReducers(state = INIT_STATE.auth, action) {
  switch (action.type) {
    case getType(login.loginRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(login.loginSuccess):
      return {
        ...state,
        loggedIn: true,
        isLoading: false,
        currentUser: action.payload,
      };
    case getType(login.loginFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(logout.logoutRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(logout.logoutSuccess):
      return {
        ...state,
        isLoading: false,
        currentUser: undefined,
        loggedIn: false,
      };
    default:
      return state;
  }
}