import { KeywordModel } from "../models/keyword.model.js";

const BEHAVIOR = {
  VIEW: "view",
  SEARCH: "search",
  REACT: "react",
  COMMENT: "comment",
  DOWNLOAD: "download",
};

const scoreOfBehavior = (behavior) => {
  switch (behavior) {
    case BEHAVIOR.VIEW:
    case BEHAVIOR.SEARCH:
      return 1;
    case BEHAVIOR.REACT:
      return 10;
    case BEHAVIOR.COMMENT:
    case BEHAVIOR.DOWNLOAD:
      return 20;
    default:
      return 0;
  }
};

async function getKeywords() {
  try {
    const keywords = await KeywordModel.find().sort("-score").limit(10).select("-behaviors").lean().exec();

    return keywords;
  } catch (error) {
    return error;
  }
}

async function updateScoreOfKeyword(KEY_WORD, IP_ADDRESS, BEHAVIOR_TYPE, SCORE_INC = 1, SCORE_QUALITY = 1) {
  try {
    const keywords = await KeywordModel.aggregate([
      {
        $match: {
          $or: [
            {
              $expr: {
                $regexMatch: {
                  input: KEY_WORD,
                  regex: "$keyword",
                },
              },
            },

            {
              keyword: {
                $regex: KEY_WORD,
                $options: "i",
              },
            },
          ],
        },
      },
    ]);

    const score = scoreOfBehavior(BEHAVIOR_TYPE) * SCORE_INC * SCORE_QUALITY;

    if (BEHAVIOR_TYPE === BEHAVIOR.VIEW || BEHAVIOR_TYPE === BEHAVIOR.SEARCH || BEHAVIOR_TYPE === BEHAVIOR.REACT) {
      await KeywordModel.updateMany({ keyword: { $in: keywords.map((item) => item.keyword) } }, { $inc: { score: score } });
    } else {
      const behavior = {};
      behavior.ip = IP_ADDRESS;
      behavior.behavior = BEHAVIOR_TYPE;
      behavior.inc = SCORE_INC;

      await KeywordModel.updateMany(
        { keyword: { $in: keywords.map((item) => item.keyword) }, behaviors: { $nin: [behavior] } },
        { $inc: { score: score }, $push: { behaviors: behavior } }
      );
    }
  } catch (error) {
    return error;
  }
}

const KeywordService = {
  getKeywords,
  updateScoreOfKeyword,
};

export default KeywordService;
