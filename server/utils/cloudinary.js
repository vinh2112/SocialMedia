import cloudinary from "../configs/cloudinary.js";
import Jimp from "jimp";
import fs from "fs";

// const LOGO = "images/Photoos.png";
const LOGO = "images/mark.png";

export const watermarkImage = async (ORIGINAL_IMAGE) => {
  try {
    const [image, logo] = await Promise.all([Jimp.read(ORIGINAL_IMAGE), Jimp.read(LOGO)]);

    // image.resize(image.bitmap.width / 2, Jimp.AUTO);
    // logo.resize(image.bitmap.width / 8, Jimp.AUTO);

    // const X = 10;
    // const Y = 10;

    image.resize(image.bitmap.width / 3, Jimp.AUTO);
    logo.resize(image.bitmap.width / 1.5, Jimp.AUTO);

    const X = image.bitmap.width / 2 - logo.bitmap.width / 2;
    const Y = image.bitmap.height / 2 - logo.bitmap.height / 2;

    image.composite(logo.fade(0.7), X, Y, [
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

export const deleteImageCloudinary = async (public_id) => {
  if (!public_id) return res.status(400).json({ msg: "No Image Selected" });

  cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
    if (err) throw err;

    return true;
  });
};
