import AWS from "../configs/aws.js";
import axios from "axios";

const rekognition = new AWS.Rekognition();

export default async function detectImage(url) {
  try {
    let data = await axios.get(url, { responseType: "arraybuffer" }).then(async (res) => {
      var params = {
        Image: {
          Bytes: res.data,
        },
      };

      return new Promise((resolve, reject) => {
        rekognition.detectLabels(params, (err, data) => {
          if (err) return err;
          else {
            const cates = data.Labels.reduce((result, label, index) => {
              if (index < 6) result.push(label.Name);
              return result;
            }, []);
            resolve(cates);
          }
        });
      });
    });

    return data;
  } catch (error) {
    return error;
  }
}
