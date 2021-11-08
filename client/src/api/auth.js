import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AuthAPI = {
  login: async (payload) => {
    try {
      const res = await axios.post(`${BASE_URL}/user/login`, payload);
      localStorage.setItem("access_token", `Bearer ${res.data.accessToken}`);
    } catch (error) {
      return error;
    }
  },

  logout: () => axios.get(`${BASE_URL}/user/logout`),

  getUserInfo: () => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = axios.get(`${BASE_URL}/user`, {
        headers: { Authorization: TOKEN },
      });

      return res;
    } catch (error) {
      return error;
    }
  },
  checkPassword: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = await axios.get(`${BASE_URL}/user/check_password`, {
        params: payload,
        headers: { Authorization: TOKEN },
      });

      return res;
    } catch (error) {
      return error;
    }
  },
};

export default AuthAPI;
