import axios from "axios";
import bcrypt from "bcrypt";
import { UserModel } from "../models/UserModel.js";
import querystring from "query-string";
import { PostModel } from "../models/PostModel.js";
import cloudinary from "../services/cloudinary.js";
import AWS from "../services/aws.js";
import detectImage from "../utils/detectImage.js";
import { watermarkImage } from "../utils/watermark.js";

const realUsers = [
  "6145e281d0de2256d6a23b2e",
  "6146090aa992b71815250579",
  "61a865fb92b8ab45890667dc",
  "61a86ecf92b8ab4589066808",
  "61a86f6892b8ab458906680b",
  "61aa28988e1b0e471270b579",
  "61aa49ad2db5a7a55e6a7bb1",
  "61af5ccf263102779927681e",
  "61b11fb95f6fd59f06849c68",
  "61c5cff16a71b308da925af5",
  "61d94708648a3986ab97bba8",
  "61d9472e648a3986ab97bbad",
  "61e4ff0eadf2969a4f03be68",
];

export const fakeUsers = async (req, res) => {
  try {
    await axios
      .get("https://randomuser.me/api/?results=1&nat=us,au,ca,fr,nl")
      .then(async (response) => {
        let userDatas = [];

        await Promise.all(
          response.data.results.map(async (data) => {
            const user = await handleUserData(data);
            userDatas.push(user);
          })
        );

        const savedUsers = await UserModel.insertMany(userDatas);

        return res.status(200).json(savedUsers);
      })
      .catch((err) => {
        return res.status(500).json({ msg: err });
      });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

let listCategories = [
  "backgrounds",
  "religion",
  "nature",
  "places",
  "food",
  "transportation",
  "travel",
  "buildings",
  "animals",
  "industry",
  "sports",
];

export const deleteFakePosts = async (req, res) => {
  try {
    const posts = await PostModel.deleteMany({
      createdAt: { $lte: new Date("2022-02-17T06:43:14.123Z") },
    });
    res.json(posts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const fakePosts = async (req, res) => {
  try {
    let listUsers = [];
    const users = await UserModel.find({ _id: { $nin: realUsers } });

    // Generate list random user
    while (listUsers.length < 80) {
      listUsers.push(users[Math.floor(Math.random() * users.length)]._id);
    }

    // Generate random post image
    let loopCount = 1; // loop limit
    let postURLs = await Promise.all(await handlePostImages(loopCount)); // Post handled
    let newPosts = []; // List post prepare to be inserted into DB

    await Promise.all(
      postURLs.map(async (postURL) => {
        const desc = await axios
          .get("https://api.quotable.io/random")
          .then((res) => res.data.content);

        const watermark = await watermarkImage(postURL.image.url);

        newPosts.push({
          userId: listUsers[Math.floor(Math.random() * listUsers.length)],
          image: {
            url: postURL.image.url,
            public_id: postURL.image.public_id,
            watermark: watermark,
          },
          category: postURL.tags,
          desc,
        });
      })
    );

    const savedPosts = await PostModel.insertMany(newPosts);

    return res.status(200).json(savedPosts);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const PHOTO_SOURCES_BASE_URL = "https://pixabay.com/api/?";
const API_KEY = "26904163-b0bc06e31c076fffb4fafcd8c";

async function handlePostImages(loopCount) {
  let posts = [];

  while (loopCount > 0) {
    const url =
      `${PHOTO_SOURCES_BASE_URL}` +
      querystring.stringify({
        key: API_KEY,
        image_type: "photo",
        pretty: true,
        page: Math.floor(Math.random() * 100),
        per_page: 3,
        category: listCategories[Math.floor(Math.random() * listCategories.length)],
        order: "popular",
        safesearch: true,
        editors_choice: true,
      });

    posts.push(
      ...(await axios.get(url).then((res) => {
        return Promise.all(
          res.data.hits.map((post) => {
            return new Promise((resolve, reject) => {
              cloudinary.v2.uploader.upload(
                post.largeImageURL,
                { folder: "Image" },
                async (err, result) => {
                  if (err) throw err;

                  let tags = [];
                  tags = await detectImage(post.largeImageURL);

                  resolve({
                    image: {
                      url: result.secure_url,
                      public_id: result.public_id,
                    },
                    tags,
                  });
                }
              );
            });
          })
        );
      }))
    );

    loopCount--;
  }

  return posts;
}

async function handleUserData(data) {
  const defaultPassword = "123456";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);
  const quote = await axios.get("https://api.quotable.io/random");

  let user = {
    email: data.email,
    password: passwordHash,
    name: data.name.first.toLowerCase() + "_" + data.name.last.toLowerCase(),
    fullName: data.name.first + " " + data.name.last,
    avatar: data.picture.large,
    city: data.location.city,
    from: data.location.country,
    desc: quote.data.content,
  };

  return user;
}

// async function detectImage(url) {
//   try {
//     let data = await axios.get(url, { responseType: "arraybuffer" }).then(async (res) => {
//       var params = {
//         Image: {
//           Bytes: res.data,
//         },
//       };

//       let categories = new Promise((resolve, reject) => {
//         rekognition.detectLabels(params, (err, data) => {
//           if (err) return err;
//           else {
//             const cates = data.Labels.reduce((result, label, index) => {
//               if (index < 6) result.push(label.Name);
//               return result;
//             }, []);
//             resolve(cates);
//           }
//         });
//       });
//       return categories;
//     });

//     return data;
//   } catch (error) {
//     return error;
//   }
// }
