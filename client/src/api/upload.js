import axios from "axios";
// import { storage } from "firebase";
import uuid from "react-uuid";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const BASE_URL_PREDICT = "http://0bc2-35-229-251-104.ngrok.io/predict";

const UPLOAD = {
  uploadImage: async (payload) => {
    try {
      let file = await fetch(payload)
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], uuid(), { type: "image/png" }));

      // Upload file
      return new Promise(async (resolve, reject) => {
        let formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(BASE_URL_PREDICT, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        let categories = [];
        res.data.predictions.filter((category) => {
          return category.probability > 0.15 && categories.push(category.label);
        });

        const image = await axios.post(`${BASE_URL}/api/upload`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        return resolve({ categories, image: image.data });
      });
    } catch (error) {
      return error;
    }
  },
  uploadAvatar: async (payload) => {
    try {
      const url = await axios.post(`${BASE_URL}/api/upload`, payload, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      return url;
    } catch (error) {
      return error;
    }
  },
};

export default UPLOAD;
