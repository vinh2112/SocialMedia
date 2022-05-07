import { NotificationModel } from "../models/NotificationModel.js";

export const getNotificationsByUserId = async (req, res) => {
  try {
    const notifications = await NotificationModel.find({
      receiverId: req.userId,
    })
      .populate({
        path: "senderId",
        select: "fullName name email avatar",
      })
      .sort("-createdAt");

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { receiverId, type, targetId } = req.body;

    if (receiverId !== req.userId) {
      const noti = await NotificationModel.findOne({ senderId: req.userId, type, targetId });

      if (!noti) {
        const newNotification = new NotificationModel({
          senderId: req.userId,
          receiverId,
          type,
          targetId,
        });

        await newNotification.save();
        // await NotificationModel.populate(newNotification, {
        //   path: "senderId",
        //   select: "name email avatar",
        // });

        // res.status(200).json(newNotification);

        return res.status(200).json({ isSuccess: true });
      }
    }

    return res.status(200).json({ isSuccess: false });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const seenNotification = async (req, res) => {
  try {
    await NotificationModel.updateMany(
      { receiverId: req.userId, seen: false },
      {
        $set: {
          seen: true,
        },
      },
      { multi: true, new: true }
    );

    const newNotifications = await NotificationModel.find({ receiverId: req.userId })
      .populate({
        path: "senderId",
        select: "fullName name email avatar",
      })
      .sort("-createdAt")
      .exec();

    return res.status(200).json(newNotifications);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
