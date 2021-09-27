import axios from "axios";
import { storage } from "firebase";
import uuid from "react-uuid";

const BASE_URL_PREDICT = "http://3736-35-188-78-102.ngrok.io/predict";

export const uploadImage = async (payload) => {
  try {
    let file = await fetch(payload)
      .then((r) => r.blob())
      .then((blobFile) => new File([blobFile], uuid(), { type: "image/png" }));

    // Upload file
    return new Promise((resolve, reject) => {
      const uploadTask = storage.ref(`images/${file.name}`).put(file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          return reject(error);
        },
        () => {
          storage
            .ref("images")
            .child(file.name)
            .getDownloadURL()
            .then(async (url) => {
              // Predict Image
              let formData = new FormData();
              formData.append("image", file);

              const res = await axios.post(BASE_URL_PREDICT, formData, {
                headers: {
                  "content-type": "multipart/form-data",
                },
              });

              let categories = [];
              res.data.predictions.filter((category) => {
                return (
                  category.probability > 0.15 && categories.push(category.label)
                );
              });

              return resolve({ categories, url });
            });
        }
      );
    });
  } catch (error) {
    return error;
  }
};
