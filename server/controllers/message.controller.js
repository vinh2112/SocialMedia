import { MessageModel } from "../models/message.model.js";

export const createMessage = async (req, res) => {
  const newMessage = new MessageModel({ ...req.body, sender: req.userId });

  try {
    const savedMessage = await newMessage.save();

    return res.status(200).json(savedMessage);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find({
      conversationId: req.params.conversationId,
    }).lean();

    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json(error);
  }
};
