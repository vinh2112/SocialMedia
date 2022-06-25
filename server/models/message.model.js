import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    text: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

var autoPopulate = function (next) {
  this.populate({
    path: "sender",
    select: "name fullName email avatar",
  });
  this.populate({
    path: "likes",
    select: "name fullName email avatar",
  });
  next();
};

schema.pre("save", autoPopulate).pre("find", autoPopulate).pre("findOne", autoPopulate);

schema.pre("save", function (next) {
  this.model("Conversation").updateOne(
    { _id: this.conversationId },
    { $set: { lastMessage: this.text } },
    next
  );
});

export const MessageModel = mongoose.model("Message", schema);
