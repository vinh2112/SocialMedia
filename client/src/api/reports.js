import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ReportAPI = {
  getAllReports: () => axios.get(`${BASE_URL}/api/report`),
  createNewReport: (payload) => {
    /*
        payload: {
            postId: "",
            reason: "",
        }
        */
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = axios.post(`${BASE_URL}/api/report`, payload, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  deleteReport: (payload) => {
    /*
        payload: ""
        */
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = axios.delete(`${BASE_URL}/api/report/${payload}`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  refuseReport: (payload) => {
    /*
        payload: ""
        */
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = axios.delete(`${BASE_URL}/api/report/${payload}/refuse`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
};

export default ReportAPI;
