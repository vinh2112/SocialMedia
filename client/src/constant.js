export const INIT_STATE = {
  auth: {
    loggedIn: false,
    isLoading: false,
    currentUser: undefined,
    errMsg: "",
  },
  posts: {
    isPosting: false,
    isLoading: false,
    data: [],
    profile: undefined,
    topLiked: undefined,
  },
  comments: {
    isLoading: false,
    data: [],
    commentId: undefined,
  },
  admin: {
    data: undefined,
    isLoading: false,
  },
  notifications: {
    data: [],
    isLoading: false,
  },
  modal: {
    isShow: false,
  },
  toast: {
    message: "",
    type: "",
    duration: 4000,
  },
};
