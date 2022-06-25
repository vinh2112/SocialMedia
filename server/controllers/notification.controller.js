import { NotificationModel } from "../models/notification.model.js";
import NotificationService from "../services/notification.service.js";

export const getNotifications = async (req, res) => {
  try {
    const { notifications } = await NotificationService.getNotificationsByUserId(req.userId);

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const createNotification = async (req, res) => {
  try {
    const { receivers, type, targetId, content } = req.body;

    await NotificationService.createNewNotification(req.userId, receivers, type, targetId, content);

    return res.status(200).json({ isSuccess: true });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const seenNotification = async (req, res) => {
  try {
    await NotificationModel.updateMany(
      { receiver: req.userId, seen: { $nin: [req.userId] } },
      {
        $push: {
          seen: req.userId,
        },
      },
      { multi: true, new: true }
    );

    const { notifications } = await NotificationService.getNotificationsByUserId(req.userId);

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
