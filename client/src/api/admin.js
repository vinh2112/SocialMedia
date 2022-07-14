import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const AdminAPI = {
  getTotal: async () => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = await axios.get(`${BASE_URL}/api/dashboard`, {
        headers: { Authorization: TOKEN },
      });

      return res;
    } catch (error) {
      return error.response;
    }
  },
  sendMail: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = await axios.post(`${BASE_URL}/api/dashboard/send-mail`, payload, { headers: { Authorization: TOKEN } });
      return res;
    } catch (error) {
      return error.response;
    }
  },
};

export default AdminAPI;
