import dotenv from "dotenv";
import AWS from "aws-sdk";
import axios from "axios";

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: "us-east-1",
});

export default async function detectImage(url) {
  try {
    const r = await axios.get(url, { responseType: "arraybuffer" });
    const buffer = new Buffer.from(r.data, "base64");
    var params = {
      Image: {
        Bytes: buffer,
      },
    };
    const rekognition = new AWS.Rekognition();
    rekognition.detectLabels(params, (err, data) => {
      if (err) res.status(500).json(err);
      else {
        let categories = [];
        data.Labels.forEach((label) => categories.push(label.Name));

        return categories;
      }
    });
  } catch (error) {
    return error;
  }
}
