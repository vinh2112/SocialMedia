import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MomoAPI = {
  getPayUrl: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.post(`${BASE_URL}/api/momo`, payload, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  confirmMomoPayment: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.get(`${BASE_URL}/api/momo/confirm?${payload}`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
};

export default MomoAPI;
