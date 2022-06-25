import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const KeywordAPI = {
  getKeywords: () => axios.get(`${BASE_URL}/api/keyword`),
};

export default KeywordAPI;
