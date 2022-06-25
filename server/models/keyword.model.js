import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    keyword: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    score: {
      type: Number,
      default: 10,
    },
    behaviors: {
      type: Array,
      default: [],
    },
  },
  { id: false, timestamps: false, versionKey: false }
);

export const KeywordModel = mongoose.model("Keyword", schema);
