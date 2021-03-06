import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostAPI = {
  fetchPost: (payload) => axios.get(`${BASE_URL}/api/post/${payload}`),
  fetchRelativePosts: (payload) => axios.get(`${BASE_URL}/api/post/${payload}/relative`),
  fetchPosts: (payload) => axios.get(`${BASE_URL}/api/post?page=${payload || 1}`),
  fetchPostsTimeline: () => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = axios.get(`${BASE_URL}/api/post/timeline`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  fetchProfilePosts: (payload) =>
    axios.get(`${BASE_URL}/api/post/profile/${payload.userId}?page=${payload.page}`),
  fetchTopLikedPosts: () => axios.get(`${BASE_URL}/api/post/top_liked`),
  searchPosts: (payload) =>
    axios.get(`${BASE_URL}/api/post/search?query=${payload.query}&page=${payload.page}`),
  createPost: (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = axios.post(`${BASE_URL}/api/post`, payload, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  updatePost: (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = axios.put(`${BASE_URL}/api/post/${payload.postId}`, payload.data, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  reactPost: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = await axios.put(
        `${BASE_URL}/api/post/${payload}/react`,
        {},
        {
          headers: { Authorization: TOKEN },
        }
      );
      return res;
    } catch (err) {
      return err;
    }
  },
  deletePost: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = await axios.delete(`${BASE_URL}/api/post/${payload}`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
  downloadPost: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.get(`${BASE_URL}/api/post/${payload}/download`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
};

export default PostAPI;
