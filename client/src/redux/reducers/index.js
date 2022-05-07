import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
import modal from "./modal";
import comments from "./comments";
import notifications from "./notifications";
import toast from "./toast";

export default combineReducers({
  posts,
  auth,
  modal,
  comments,
  notifications,
  toast,
});
