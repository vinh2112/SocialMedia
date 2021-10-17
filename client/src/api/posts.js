import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostAPI = {
  fetchPosts: () => axios.get(`${BASE_URL}/api/post`),
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
    axios.get(`${BASE_URL}/api/profile/post/${payload}`),
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
};

export default PostAPI;
