import { NotificationModel } from "../models/notification.model.js";

const NOTIFICATION_TYPE = {
  PROFILE: "profile", //done
  REACT: "react", // done
  COMMENT: "comment", //done
  NEW_POST: "new-post",
  DELETE_POST: "delete-post",
  DOWNLOAD: "download", // done
  ADMIN_INFORM: "admin-inform",
};

function getContentByNotiType(NOTI_TYPE) {
  switch (NOTI_TYPE) {
    case NOTIFICATION_TYPE.PROFILE:
      return "have just followed your profile.";
    case NOTIFICATION_TYPE.REACT:
      return "have just reacted to your post.";
    case NOTIFICATION_TYPE.COMMENT:
      return "have just commented on your post.";
    case NOTIFICATION_TYPE.NEW_POST:
      return "have just posted new post. View now.";
    case NOTIFICATION_TYPE.DELETE_POST:
      return "have just deleted your post. Because of violating Photoos's policies.";
    case NOTIFICATION_TYPE.DOWNLOAD:
      return "have just downloaded your post.";
    default:
      return "informed that you have a new event.";
  }
}

function getTargetLinkByType(NOTI_TYPE, TARGET_ID) {
  switch (NOTI_TYPE) {
    case NOTIFICATION_TYPE.PROFILE:
      return `/profile/${TARGET_ID}`;
    case NOTIFICATION_TYPE.REACT:
    case NOTIFICATION_TYPE.COMMENT:
    case NOTIFICATION_TYPE.NEW_POST:
    case NOTIFICATION_TYPE.DOWNLOAD:
      return `/post/${TARGET_ID}`;
    default:
      return "#";
  }
}

async function getNotificationsByUserId(receiver) {
  try {
    const notifications = await NotificationModel.find({
      receivers: { $in: [receiver] },
    })
      .populate({
        path: "senders",
        select: "fullName name email avatar",
      })
      .sort("-updatedAt")
      .lean();

    return { notifications };
  } catch (error) {
    return error;
  }
}

async function createNewNotification(sender, receivers, type, targetId, content = "") {
  try {
    receivers = receivers.filter((receiver) => receiver !== sender);
    const targetLink = getTargetLinkByType(type, targetId);

    const notification = await NotificationModel.findOne({ receivers: { $in: receivers }, type, targetLink }).lean();

    if (!notification || type === NOTIFICATION_TYPE.ADMIN_INFORM) {
      if (!content) {
        content = getContentByNotiType(type);
      }

      const newNotification = new NotificationModel({
        senders: [sender],
        receivers,
        type,
        targetLink,
        content,
      });

      return newNotification.save();
    } else {
      if (!notification.senders.some((id) => id.toString() === sender)) {
        const noti = await NotificationModel.findByIdAndUpdate(
          notification._id,
          {
            $push: { senders: { $each: [sender], $position: 0 } },
            $set: { seen: false },
          },
          { new: true }
        );

        return noti;
      } else {
        console.log("already noti");
      }
    }
  } catch (error) {
    return error;
  }
}

const NotificationService = {
  getNotificationsByUserId,
  createNewNotification,
};

export default NotificationService;
