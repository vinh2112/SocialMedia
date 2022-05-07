import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    seen: {
      type: Boolean,
      default: true,
    },
    lastMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

var autoPopulate = function (next) {
  this.populate({
    path: "members",
    select: "name fullName email avatar",
  });
  next();
};

schema.pre("save", autoPopulate).pre("find", autoPopulate).pre("findOne", autoPopulate);

export const ConversationModel = mongoose.model("Conversation", schema);
