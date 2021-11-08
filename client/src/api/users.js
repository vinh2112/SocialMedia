import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const UserAPI = {
  interact: async (payload) => {
    const TOKEN = localStorage.getItem("access_token");
    try {
      const res = await axios.put(
        `${BASE_URL}/user/${payload}/interact`,
        {},
        {
          headers: { Authorization: TOKEN },
        }
      );
      return res;
    } catch (error) {
      return error;
    }
  },
  getProfileUser: async (payload) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/${payload}/profile`);
      return res;
    } catch (error) {
      return error;
    }
  },
  updateUser: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.put(`${BASE_URL}/user`, payload, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
};

export default UserAPI;
