import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const MessageAPI = {
  getMessages: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.get(`${BASE_URL}/api/message/${payload}`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  createMessage: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.post(`${BASE_URL}/api/message`, payload, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
};

export default MessageAPI;
