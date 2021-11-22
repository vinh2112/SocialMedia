import { getTopLikedPosts } from "redux/actions/posts";
import { INIT_STATE } from "../../constant";
import {
  createPost,
  getPosts,
  getProfilePosts,
  getType,
  reactPost,
  interactUser,
  getPostsLoadMore,
  searchPosts,
  getProfileUser,
  resetPosts,
  updatePost,
} from "../actions";

export default function postsReducers(state = INIT_STATE.posts, action) {
  switch (action.type) {
    case getType(resetPosts):
      return {
        ...state,
        data: [],
      };
    case getType(getPosts.getPostsRequest):
      return {
        ...state,
        isLoading: true,
        data: [],
      };
    case getType(getPosts.getPostsSuccess):
      return {
        ...state,
        isLoading: false,
        data: [...new Map(action.payload.map((item) => [item["_id"], item])).values()],
      };
    case getType(getPosts.getPostsFailure):
      return {
        ...state,
        isLoading: false,
      };
    case getType(getPostsLoadMore.getPostsLoadMoreRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(getPostsLoadMore.getPostsLoadMoreSuccess):
      return {
        ...state,
        isLoading: false,
        data: [
          ...new Map(
            [...state.data, ...action.payload].map((item) => [item["_id"], item])
          ).values(),
        ],
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
        data: [...state.data, ...action.payload],
      };
    case getType(getProfilePosts.getProfilePostsFailure):
      return {
        ...state,
        isLoading: false,
        data: [],
        profile: undefined,
      };
    case getType(getTopLikedPosts.getTopLikedPostsRequest):
      return {
        ...state,
      };
    case getType(getTopLikedPosts.getTopLikedPostsSuccess):
      return {
        ...state,
        topLiked: action.payload,
      };
    case getType(getProfileUser):
      return {
        ...state,
        profile: action.payload,
      };
    case getType(searchPosts.searchPostsRequest):
      return {
        ...state,
        isLoading: true,
      };
    case getType(searchPosts.searchPostsSuccess):
      if (
        (action.payload.page === 1 && action.payload.query !== "") ||
        (action.payload.page === 1 && action.payload.query === "")
      )
        return {
          ...state,
          isLoading: false,
          data: [...action.payload.posts],
        };
      return {
        ...state,
        isLoading: false,
        data: [...state.data, ...action.payload.posts],
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
    case getType(updatePost):
      return {
        ...state,
        topLiked: state.topLiked.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        data: state.data.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    case getType(reactPost.reactPostRequest):
      return {
        ...state,
      };
    case getType(reactPost.reactPostSuccess):
      return {
        ...state,
        topLiked: state.topLiked.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        data: state.data.map((post) => (post._id === action.payload._id ? action.payload : post)),
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
