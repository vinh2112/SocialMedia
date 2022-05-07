import { ConversationModel } from "../models/ConversationModel.js";

export const getConversationsByUserId = async (req, res) => {
  try {
    const conversations = await ConversationModel.find({
      members: { $in: [req.userId] },
    }).sort("-updatedAt");

    return res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createConversation = async (req, res) => {
  const { receiverId } = req.body;
  try {
    const conversation = await ConversationModel.findOne({ members: [req.userId, receiverId] });

    if (!conversation) {
      const newConversation = new ConversationModel({
        members: [req.userId, receiverId],
      });

      const savedConversation = await newConversation.save();

      return res.status(200).json(savedConversation);
    } else {
      return res.status(200).json(conversation);
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findConversation = async (req, res) => {
  const { receiverId } = req.params;

  try {
    const conversation = await ConversationModel.findOne({
      members: { $all: [req.userId, receiverId] },
    });

    if (!conversation) {
      const newConversation = new ConversationModel({
        members: [req.userId, receiverId],
      });

      const savedConversation = await newConversation.save();

      return res.status(200).json(savedConversation);
    }

    return res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error);
  }
};
