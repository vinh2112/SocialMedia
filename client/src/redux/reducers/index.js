import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import modal from "./modal";

export default combineReducers({
  posts,
  auth,
  modal,
});
