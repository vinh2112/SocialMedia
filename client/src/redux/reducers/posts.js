import { INIT_STATE } from "../../constant";
import {
  createPost,
  getPosts,
  getProfilePosts,
  getType,
  reactPost,
  interactUser,
} from "../actions";

export default function postsReducers(state = INIT_STATE.posts, action) {
  switch (action.type) {
    case getType(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPosts.getPostsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case getType(getPosts.getPostsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(getProfilePosts.getProfilePostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getProfilePosts.getProfilePostsSuccess):
      return {
        ...state,
        isLoading: false,
        data: action.payload.posts,
        profile: action.payload.user,
      };
    case getType(getProfilePosts.getProfilePostsFailure):
      return {
        ...state,
        isLoading: false,
        data: [],
        profile: undefined,
      };
    case getType(createPost.createPostRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(createPost.createPostSuccess):
      return {
        ...state,
        isLoading: false,
        data: [action.payload, ...state.data],
      };
    case getType(createPost.createPostFailure):
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case getType(reactPost.reactPostRequest):
      return {
        ...state,
      };
    case getType(reactPost.reactPostSuccess):
      return {
        ...state,
        data: state.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case getType(reactPost.reactPostFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(interactUser.interactUserRequest):
      return {
        ...state,
      };
    case getType(interactUser.interactUserSuccess):
      return {
        ...state,
        profile: action.payload,
      };
    case getType(interactUser.interactUserFailure):
      return {
        ...state,
      };
    default:
      return state;
  }
}
