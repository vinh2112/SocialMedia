import axios from "axios";
import uuid from "react-uuid";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const DUPLICATE_API_URL = process.env.REACT_APP_DUPLICATE_API_URL;

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

        const res = await axios.post(`${BASE_URL}/api/detect`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        let categories = res.data.Labels.reduce((result, label, index) => {
          if (index < 6) result.push(label.Name);
          return result;
        }, []);

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
  checkDuplicateImage: async (payload) => {
    try {
      let file = await fetch(payload)
        .then((r) => r.blob())
        .then((blobFile) => new File([blobFile], uuid(), { type: "image/png" }));

      // Upload file
      return new Promise(async (resolve, reject) => {
        let formData = new FormData();
        formData.append("image", file);

        const res = await axios.post(`${DUPLICATE_API_URL}/duplicate`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        return resolve({ isDuplicate: res.data.isDuplicate });
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
