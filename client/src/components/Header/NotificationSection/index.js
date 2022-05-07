import { SocketContext } from "context/socketContext";
import React, { useContext, useEffect } from "react";
import {
  ListNotification,
  NotificationContainer,
  NotificationItemContainer,
  NotifyAvatar,
  NotifyAvatarWrapper,
  NotifyContent,
  NotifyText,
  NotifyTime,
  NotifyWrapper,
} from "./NotificationSectionElements";
import * as api from "api";
import * as actions from "redux/actions";
import moment from "moment";
import { useDispatch } from "react-redux";

export default function NotificationSection({ isOpen, notifications }) {
  const socket = useContext(SocketContext);
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("getNotification", async () => {
      await api.NotificationAPI.fetchNotifications().then((res) =>
        dispatch(actions.fetchNotifications.fetchNotificationsSuccess(res.data))
      );
    });
  }, [socket, dispatch]);
  return (
    <NotificationContainer isOpen={isOpen}>
      <div className="notify-title">Notification</div>
      <ListNotification>
        {notifications.map((noti) => (
          <NotificationItem key={noti._id} notification={noti} />
        ))}
      </ListNotification>
    </NotificationContainer>
  );
}

const NotificationItem = ({ notification }) => {
  const displayText = (type) => {
    let action;

    if (type === 0) {
      action = "liked your post";
    } else if (type === 1) {
      action = "commented your post";
    } else if (type === 2) {
      action = "followed your profile";
    }

    return `just ${action}.`;
  };

  return (
    <NotificationItemContainer>
      <NotifyWrapper to="#">
        <NotifyAvatarWrapper>
          <NotifyAvatar src={notification.senderId.avatar} alt="notify-avatar" />
        </NotifyAvatarWrapper>

        <NotifyContent>
          <NotifyText seen={notification.seen}>
            <span className="notify-sender">
              {notification.senderId.fullName || notification.senderId.name}
            </span>{" "}
            {displayText(notification.type)}
          </NotifyText>

          <NotifyTime seen={notification.seen}>
            {moment(notification.createdAt).fromNow()}
          </NotifyTime>
        </NotifyContent>
      </NotifyWrapper>
    </NotificationItemContainer>
  );
};
