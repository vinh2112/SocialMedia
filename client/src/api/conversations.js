import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ConversationAPI = {
  getConversations: async () => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = await axios.get(`${BASE_URL}/api/conversation`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  findConversation: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");

      const res = await axios.get(`${BASE_URL}/api/conversation/${payload}`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
};

export default ConversationAPI;
