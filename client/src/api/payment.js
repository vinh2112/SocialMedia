import axios from "axios";
import queryString from "query-string";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PaymentApi = {
  getPayments: async () => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.get(`${BASE_URL}/api/payment`, {
        headers: { Authorization: TOKEN },
      });

      return res;
    } catch (error) {
      return error;
    }
  },
  createPayment: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.post(`${BASE_URL}/api/payment/${payload.postId}`, payload.postBody, {
        headers: { Authorization: TOKEN },
      });

      return res;
    } catch (error) {
      return error;
    }
  },
  checkPayment: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("access_token");
      const res = await axios.get(`${BASE_URL}/api/payment/${payload}`, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (error) {
      return error;
    }
  },
  getPaypalToken: async (payload) => {
    try {
      const string = queryString.stringify({ grant_type: "client_credentials" });
      const clientId =
        "AXTHX41OY79amHiVG6zW8JPNBFeSIJ46JPU-JqUeM1738odaegVO1UZZjXcgUYFki0dwGrqEJO6a8-FP";
      const SecretKey =
        "EC8PfebphxgB-1cAQm9pjtkDmqA5gDRDBK9SskUWAkxmh5VKuTG22OQ8fcj55cXcTYGfXm_kC_Cyzxit";
      const author = Buffer.from(`${clientId}:${SecretKey}`, "utf8").toString("base64");
      const res = await axios.post(`https://api.sandbox.paypal.com/v1/oauth2/token`, string, {
        headers: {
          Authorization: `Basic ${author}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      localStorage.setItem("paypal_token", `Bearer ${res.data.access_token}`);
      return res;
    } catch (error) {
      return error;
    }
  },

  payout: async (payload) => {
    try {
      const TOKEN = localStorage.getItem("paypal_token");
      console.log(TOKEN);
      const res = await axios.post(`https://api.sandbox.paypal.com/v1/payments/payouts`, payload, {
        headers: { Authorization: TOKEN },
      });
      return res;
    } catch (err) {
      return err;
    }
  },
};
export default PaymentApi;
