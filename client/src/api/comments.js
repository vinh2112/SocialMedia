import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const CommentAPI = {
  fetchComments: async (payload) => {
    try {
      const res = await axios
        .get(`${BASE_URL}/api/comment/${payload}`)
        .then((res) => res)
        .catch((err) => {
          return err.response;
        });

      return res;
    } catch (error) {
      return error;
    }
  },
  createComment: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.post(`${BASE_URL}/api/comment`, payload, {
        headers: { Authorization: TOKEN },
      });

      return res;
    } catch (error) {
      return error;
    }
  },
  deleteComment: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.delete(`${BASE_URL}/api/comment/${payload}`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error.response;
    }
  },
  createReplyComment: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.put(
        `${BASE_URL}/api/comment/${payload.commentId}/reply`,
        { reply: payload.comment },
        {
          headers: { Authorization: TOKEN },
        }
      );
      return res;
    } catch (error) {
      return error.response;
    }
  },
  deleteReplyComment: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.delete(
        `${BASE_URL}/api/comment/${payload.commentId}/reply`,
        {
          data: {
            replyId: payload.replyId,
          },
          headers: { Authorization: TOKEN },
        }
      );
      return res;
    } catch (error) {
      return error.response;
    }
  },
};

export default CommentAPI;
