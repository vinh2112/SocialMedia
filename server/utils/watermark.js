import cloudinary from "../services/cloudinary.js";
import Jimp from "jimp";
import fs from "fs";

const LOGO = "images/Photoos.png";

export const watermarkImage = async (ORIGINAL_IMAGE) => {
  try {
    const [image, logo] = await Promise.all([Jimp.read(ORIGINAL_IMAGE), Jimp.read(LOGO)]);

    image.resize(image.bitmap.width / 2, Jimp.AUTO);
    logo.resize(logo.bitmap.width / 4, Jimp.AUTO);

    const X = 10;
    const Y = 10;

    image.composite(logo.fade(0.6), X, Y, [
      {
        mode: Jimp.BLEND_SOURCE_OVER,
        opacityDest: 1,
        opacitySource: 0.5,
      },
    ]);

    const file_name = `tmp/${Date.now()}_waterMark_150x150.png`;

    await image.writeAsync(file_name);

    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload(file_name, { folder: "Watermark" }, async (err, result) => {
        if (err) throw err;

        removeTemp(file_name);
        resolve(result.secure_url);
      });
    });
  } catch (error) {
    return error;
  }
};

const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
