import { INIT_STATE } from "../../constant";
import { createPost, getPosts, getType, reactPost } from "../actions";

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
        isLoading: true,
      };
    case getType(reactPost.reactPostSuccess):
      return {
        ...state,
        isLoading: false,
        data: state.data.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case getType(reactPost.reactPostFailure):
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
