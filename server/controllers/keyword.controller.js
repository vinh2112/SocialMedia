import KeywordService from "../services/keyword.service.js";

export const getKeywords = async (req, res) => {
  try {
    const keywords = await KeywordService.getKeywords();

    return res.status(200).json(keywords);
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
