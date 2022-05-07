import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const NotificationAPI = {
  fetchNotifications: async () => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios
        .get(`${BASE_URL}/api/noti`, { headers: { Authorization: TOKEN } })
        .then((res) => res)
        .catch((err) => {
          return err.response;
        });

      return res;
    } catch (error) {
      return error;
    }
  },
  createNotification: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.post(`${BASE_URL}/api/noti`, payload, {
        headers: { Authorization: TOKEN },
      });

      return res;
    } catch (error) {
      return error.response;
    }
  },
  seenNotifications: async () => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.put(
        `${BASE_URL}/api/noti`,
        {},
        {
          headers: { Authorization: TOKEN },
        }
      );

      return res;
    } catch (error) {
      return error.response;
    }
  },
};

export default NotificationAPI;
