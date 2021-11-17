import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const PaymentApi ={
    createPayment: async (payload) => {
        try {
            const TOKEN = localStorage.getItem("access_token");
            const res = await axios.post(`${BASE_URL}/api/payment/${payload.postId}`,payload.postBody, {
              headers: { Authorization: TOKEN },
            });
      
            return res;
          } catch (error) {
            return error;
          }
    },
    checkPayment: async(payload)=>{
        try{
            const TOKEN = localStorage.getItem("access_token");
            const res = await axios.get(`${BASE_URL}/api/payment/${payload}`, {
                headers: { Authorization: TOKEN },
            });
            return res;
        }catch(error) {
            return error;
        }
    }

};
export default PaymentApi;