import axios from "axios";
import queryString from 'query-string';

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
    },
    getPaypalToken: async(payload) =>{
        try{
            // const querystring = require('query-string')
            const string = queryString.stringify({'grant_type': 'client_credentials'})
            const clientId = "AfkOD-oXxY4qyuVSiK0snmzZN6PX3Jt397TXnbW4vtuPubej1Kd8OabdTW0LRtOVJIYP0LtWyT6FXL8i";
            const SecretKey = "EC_D2O-OfnnXQWRXhERm6584DrTG_HIH3iefcBftM4jd0sJ3pwAKJYBX6_AuBwElyrKNwPTL5TtXfqva";
            const author = Buffer.from(`${clientId}:${SecretKey}`,'utf8').toString('base64')
            const res = await axios.post(`https://api.sandbox.paypal.com/v1/oauth2/token`,
            // {
            //     // queryString.stringify({'grant_type': 'client_credentials'})
            //     string,
            //     // data:{
            //     //     "grant_type": "client_credentials"
            //     // }
            //     // "grant_type": "client_credentials",
            // },
            string,
            {
                // data:{
                //     "grant_type": "client_credentials"
                // },
                headers:{
                // Authorization: {
                //     username: clientId,
                //     password: SecretKey
                // },
                Authorization: `Basic ${author}`,
                // auth: {
                //     username: clientId,
                //     password:SecretKey

                // },
                'Content-Type': 'application/x-www-form-urlencoded',
            }})
            localStorage.setItem("paypal_token", `Bearer ${res.data.access_token}`);
            return res;
        }
        catch(error){
            return error
        }

    },

    payout:async(payload) =>{
        try{
            const TOKEN = localStorage.getItem("paypal_token");
            console.log(TOKEN)
            const res = await axios.post(`https://api.sandbox.paypal.com/v1/payments/payouts`,payload,{
                headers: { Authorization: TOKEN}

            })
            return res;
            
        }
        catch(err){
            return err;
        }
    }

};
export default PaymentApi;