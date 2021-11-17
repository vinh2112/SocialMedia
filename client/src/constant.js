export const INIT_STATE = {
  auth: {
    loggedIn: false,
    isLoading: false,
    currentUser: undefined,
  },
  posts: {
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
  modal: {
    isShow: false,
  },
  toast: {
    message: "",
    type: "",
    duration: 2000,
  },
};
