import express from "express";
import dotenv from "dotenv";
import AWS from "aws-sdk";
import fs from "fs";
import axios from "axios";

dotenv.config();

const router = express.Router();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  sessionToken: process.env.AWS_SESSION_TOKEN,
  region: "us-east-1",
});

const translate = new AWS.Translate({ apiVersion: "2017-07-01" });

router.get("/translate", async (req, res) => {
  try {
    const { text } = req.body;
    const params = {
      SourceLanguageCode: "vi",
      TargetLanguageCode: "en",
      Text: text,
    };
    const data = await translate.translateText(params).promise();
    res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ msg: error.message });
  }
});

router.get("/detect/url", async (req, res) => {
  try {
    const url =
      "https://res.cloudinary.com/santaclaus/image/upload/v1650635884/Social-Media/nn2wnnhdod3arpqgg9rc.jpg";
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
        res.status(200).json(data);
      }
    });
    // const data = rekognition.detectLabels(params);
    // res.json(data);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

router.post("/detect", async (req, res) => {
  try {
    const file = req.files.image;

    fs.readFile(file.tempFilePath, (err, data) => {
      if (!err) {
        const buffer = new Buffer.from(data, "base64");
        var params = {
          Image: {
            Bytes: buffer,
          },
        };
        const rekognition = new AWS.Rekognition();
        rekognition.detectLabels(params, (err, data) => {
          if (err) res.status(500).json(err);
          else {
            res.status(200).json(data);
          }
          removeTemp(file.tempFilePath);
        });
      } else {
        res.json(err);
      }
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
});

const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export default router;
